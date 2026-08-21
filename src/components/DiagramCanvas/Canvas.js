import React, {
	forwardRef,
	useCallback,
	useEffect,
	useImperativeHandle,
	useMemo,
	useRef,
	useState
} from 'react';
import PropTypes from 'prop-types';
import {
	ReactFlow,
	Background,
	MiniMap,
	useReactFlow,
	useStoreApi,
	useNodesInitialized,
	applyNodeChanges,
	applyEdgeChanges
} from '@xyflow/react';
import withHandles, { DiagramNodeShape } from './Node';
import { EDGE_TYPES, DiagramEdgeShape } from './Edge';
import { mapNodesToRf, mapEdgesToRf, readNodeChanges, readEdgeChanges } from './format';
import DiagramControls from './Controls';
import styles from './styles';

/**
 * @typedef {Object} DiagramCanvasHandle
 * @property {(nodeId: string, opts?: { duration?: number, padding?: number }) => void} zoomToNode - default: duration 400, padding 0.3
 * @property {(edgeId: string, opts?: { duration?: number, padding?: number }) => void} zoomToEdge - default: duration 400, padding 0.3
 * @property {(opts?: { duration?: number, padding?: number }) => void} fitView - default: duration 400, padding 0.3
 * @property {(opts?: { duration?: number }) => void} zoomIn - default: duration 400
 * @property {(opts?: { duration?: number }) => void} zoomOut - default: duration 400
 * @property {(ids?: string[]) => void} selectNodes - reemplaza la selección actual con esos nodos
 * @property {(ids?: string[]) => void} selectEdges - reemplaza la selección actual con esos edges
 * @property {() => void} clearSelection - limpia toda la selección
 * @property {(ids?: { nodes?: string[], edges?: string[] }) => Promise<void>} deleteElements - borra los elementos vía React Flow (pasa por onBeforeDelete y onNodesChange/onEdgesChange)
 */

const defaultViewportOpts = { duration: 400, padding: 0.3 };
const defaultZoomOpts = { duration: 400 };

// Defaults de React Flow para minZoom/maxZoom cuando no se declaran. Se usan acá
// para validar el rango contra los valores EFECTIVOS (declarado o default), no
// contra los crudos de config: declarar un solo extremo (ej. minZoom: 3 sin
// maxZoom) puede invertirse contra el default del otro (maxZoom: 2) sin que un
// chequeo que solo mire minZoom/maxZoom de config lo detecte.
const DEFAULT_MIN_ZOOM = 0.5;
const DEFAULT_MAX_ZOOM = 2;

/**
 * Valida `minZoom`/`maxZoom` antes de pasarlos a React Flow: ninguno de los dos
 * validators internos (React Flow, d3-zoom) chequea signo ni orden, así que un
 * rango inválido (<= 0, o invertido) se propaga en silencio y puede degenerar
 * el clamp de `initialZoom`. Si son inválidos, se ignoran ambos y se cae a los
 * defaults del componente (0.5/2).
 */
const getEffectiveZoomBounds = (minZoom, maxZoom) => {
	const isInvalidBound = (value) => value != null && (!Number.isFinite(value) || value <= 0);
	const resolvedMin = minZoom ?? DEFAULT_MIN_ZOOM;
	const resolvedMax = maxZoom ?? DEFAULT_MAX_ZOOM;
	const hasInvalidRange =
		!Number.isFinite(resolvedMin) || !Number.isFinite(resolvedMax) || resolvedMax <= resolvedMin;

	if (isInvalidBound(minZoom) || isInvalidBound(maxZoom) || hasInvalidRange) {
		if (process.env.NODE_ENV !== 'production') {
			// eslint-disable-next-line no-console
			console.warn(
				`[DiagramCanvas] Invalid config.minZoom/maxZoom (minZoom=${minZoom}, maxZoom=${maxZoom}). Both must be > 0 and maxZoom must be greater than minZoom. Both values are ignored and defaults (${DEFAULT_MIN_ZOOM}/${DEFAULT_MAX_ZOOM}) are used instead.`
			);
		}
		return { minZoom: DEFAULT_MIN_ZOOM, maxZoom: DEFAULT_MAX_ZOOM };
	}

	return { minZoom: resolvedMin, maxZoom: resolvedMax };
};

const Canvas = forwardRef(
	(
		{
			nodes,
			edges,
			nodeComponents,
			config,
			onNodesChange,
			onEdgesChange,
			onConnect,
			onReconnect,
			onNodeClick,
			onEdgeClick,
			onBeforeDelete,
			onSelectionChange
		},
		ref
	) => {
		const {
			readOnly,
			showControls,
			showMiniMap,
			resizableNodes,
			fitViewOnMount,
			initialZoom,
			minZoom,
			maxZoom
		} = config;
		const rf = useReactFlow();
		const store = useStoreApi();
		const nodesInitialized = useNodesInitialized();
		const didSetInitialZoomRef = useRef(false);

		const { minZoom: effectiveMinZoom, maxZoom: effectiveMaxZoom } = useMemo(
			() => getEffectiveZoomBounds(minZoom, maxZoom),
			[minZoom, maxZoom]
		);
		// Única fuente de verdad de "initialZoom es un valor usable": si es NaN,
		// no debe ni aplicar setCenter ni desactivar fitViewOnMount (ver JSX y efecto).
		const hasValidInitialZoom = initialZoom != null && Number.isFinite(initialZoom);

		const rfNodes = useMemo(() => mapNodesToRf(nodes), [nodes]);
		const rfEdges = useMemo(() => mapEdgesToRf(edges), [edges]);

		// Estado interno solo para que RF pueda trackear measured/selección/drag visual.
		// Se reinicializa cuando el consumidor cambia su copia (rfNodes/rfEdges).
		const [internalNodes, setInternalNodes] = useState(rfNodes);
		const [internalEdges, setInternalEdges] = useState(rfEdges);

		const prevRfNodesRef = React.useRef(rfNodes);
		if (prevRfNodesRef.current !== rfNodes) {
			prevRfNodesRef.current = rfNodes;
			setInternalNodes((prev) =>
				rfNodes.map((node) => {
					const internalNode = prev.find((candidate) => candidate.id === node.id);
					// Preservar measured para que RF no pierda dimensiones calculadas,
					// salvo que el consumidor haya cambiado width/height (resize): ahí
					// dejamos que RF re-mida para no anclar edges con medidas viejas.
					if (!internalNode?.measured) return node;
					const sizeChanged =
						node.width !== internalNode.width || node.height !== internalNode.height;
					return sizeChanged ? node : { ...node, measured: internalNode.measured };
				})
			);
		}

		const prevRfEdgesRef = React.useRef(rfEdges);
		if (prevRfEdgesRef.current !== rfEdges) {
			prevRfEdgesRef.current = rfEdges;
			setInternalEdges(rfEdges);
		}

		useImperativeHandle(
			ref,
			() => ({
				zoomToNode: (id, opts) =>
					rf.fitView({ nodes: [{ id }], maxZoom: 1.5, ...defaultViewportOpts, ...opts }),
				zoomToEdge: (id, opts) => {
					const edge = rf.getEdge(id);
					if (edge)
						rf.fitView({
							nodes: [{ id: edge.source }, { id: edge.target }],
							...defaultViewportOpts,
							...opts
						});
				},
				fitView: (opts) => rf.fitView({ ...defaultViewportOpts, ...opts }),
				zoomIn: (opts) => rf.zoomIn({ ...defaultZoomOpts, ...opts }),
				zoomOut: (opts) => rf.zoomOut({ ...defaultZoomOpts, ...opts }),
				selectNodes: (ids = []) => {
					const { unselectNodesAndEdges, addSelectedNodes } = store.getState();
					unselectNodesAndEdges();
					if (ids.length) addSelectedNodes(ids);
				},
				selectEdges: (ids = []) => {
					const { unselectNodesAndEdges, addSelectedEdges } = store.getState();
					unselectNodesAndEdges();
					if (ids.length) addSelectedEdges(ids);
				},
				clearSelection: () => store.getState().unselectNodesAndEdges(),
				deleteElements: ({ nodes: nodeIds = [], edges: edgeIds = [] } = {}) =>
					rf.deleteElements({
						nodes: nodeIds.map((id) => ({ id })),
						edges: edgeIds.map((id) => ({ id }))
					})
			}),
			[rf, store]
		);

		const nodeTypes = useMemo(
			() =>
				Object.fromEntries(
					Object.entries(nodeComponents).map(([type, Component]) => [
						type,
						withHandles(Component, { resizable: resizableNodes })
					])
				),
			[nodeComponents, resizableNodes]
		);

		const handleNodesChangeCallback = useCallback(
			(changes) => {
				// El 'remove' no se aplica al interno: espera a que el consumidor
				// lo devuelva por props. Así el consumidor puede rechazar/cancelar
				// un borrado sin que la pantalla ya se haya adelantado.
				const applied = changes.filter((c) => c.type !== 'remove');
				setInternalNodes((prev) => applyNodeChanges(applied, prev));
				const delta = readNodeChanges(changes);
				if (delta.length) onNodesChange?.(delta);
			},
			[onNodesChange]
		);

		const handleEdgesChangeCallback = useCallback(
			(changes) => {
				// Idem: 'remove' y 'add' se excluyen del apply interno.
				const visualChanges = changes.filter((c) => c.type !== 'add' && c.type !== 'remove');
				if (visualChanges.length) setInternalEdges((prev) => applyEdgeChanges(visualChanges, prev));
				const delta = readEdgeChanges(changes);
				if (delta.length) onEdgesChange?.(delta);
			},
			[onEdgesChange]
		);

		const handleConnect = useCallback(
			(connection) => {
				onConnect?.({
					source: connection.source,
					target: connection.target,
					sourceHandle: connection.sourceHandle,
					targetHandle: connection.targetHandle
				});
			},
			[onConnect]
		);

		const handleReconnect = useCallback(
			(oldEdge, newConnection) => {
				onReconnect?.({
					id: oldEdge.id,
					source: newConnection.source,
					target: newConnection.target,
					sourceHandle: newConnection.sourceHandle,
					targetHandle: newConnection.targetHandle
				});
			},
			[onReconnect]
		);

		const handleBeforeDelete = useCallback(
			async ({ nodes: nodesToDelete, edges: edgesToDelete }) => {
				if (!onBeforeDelete) return true;

				const result = await onBeforeDelete({
					nodes: nodesToDelete.map((node) => {
						// eslint-disable-next-line no-unused-vars
						const { handleConfig, ...data } = node.data || {};
						return { id: node.id, type: node.type, data };
					}),
					edges: edgesToDelete.map((edge) => {
						// eslint-disable-next-line no-unused-vars
						const { selectedStyle, ...data } = edge.data || {};
						return { id: edge.id, data };
					})
				});

				// bool/undefined → confirmar (true) o cancelar (false) todo el borrado.
				if (typeof result !== 'object' || result === null) return result !== false;

				// { nodes, edges } → borrado selectivo: filtrar los objetos RF originales
				// por los ids que el consumidor devolvió (RF hace el match por id).
				const idsToDelete = (elements) => new Set((elements || []).map(({ id }) => id));
				const nodeIds = idsToDelete(result.nodes);
				const edgeIds = idsToDelete(result.edges);
				return {
					nodes: nodesToDelete.filter((node) => nodeIds.has(node.id)),
					edges: edgesToDelete.filter((edge) => edgeIds.has(edge.id))
				};
			},
			[onBeforeDelete]
		);

		const handleSelectionChange = useCallback(
			({ nodes: selectedNodes, edges: selectedEdges }) =>
				onSelectionChange?.({
					nodes: selectedNodes.map(({ id }) => ({ id })),
					edges: selectedEdges.map(({ id }) => ({ id }))
				}),
			[onSelectionChange]
		);

		const handleNodeClick = useCallback(
			(_event, node) => {
				// eslint-disable-next-line no-unused-vars
				const { handleConfig, ...data } = node.data || {};
				onNodeClick?.({ id: node.id, type: node.type, data });
			},
			[onNodeClick]
		);

		const handleEdgeClick = useCallback(
			(_event, edge) => {
				// eslint-disable-next-line no-unused-vars
				const { selectedStyle, ...data } = edge.data || {};
				onEdgeClick?.({ id: edge.id, data });
			},
			[onEdgeClick]
		);

		useEffect(() => {
			if (!hasValidInitialZoom || didSetInitialZoomRef.current || !nodesInitialized) return;

			const bounds = rf.getNodesBounds(rf.getNodes());
			if (!bounds.width && !bounds.height) return; // sin nodos: no-op

			const { minZoom: storeMinZoom, maxZoom: storeMaxZoom } = store.getState();
			const clampedZoom = Math.min(Math.max(initialZoom, storeMinZoom), storeMaxZoom);

			rf.setCenter(bounds.x + bounds.width / 2, bounds.y + bounds.height / 2, {
				zoom: clampedZoom
			});
			didSetInitialZoomRef.current = true;
		}, [nodesInitialized, initialZoom, hasValidInitialZoom, rf, store]);

		return (
			<styles.Container>
				<ReactFlow
					nodes={internalNodes}
					edges={internalEdges}
					nodeTypes={nodeTypes}
					edgeTypes={EDGE_TYPES}
					proOptions={{ hideAttribution: true }}
					fitView={hasValidInitialZoom ? false : fitViewOnMount}
					minZoom={effectiveMinZoom}
					maxZoom={effectiveMaxZoom}
					nodesDraggable={!readOnly}
					nodesConnectable={!readOnly}
					elementsSelectable={!readOnly}
					connectionMode="loose"
					onNodesChange={handleNodesChangeCallback}
					onEdgesChange={handleEdgesChangeCallback}
					onConnect={handleConnect}
					onReconnect={handleReconnect}
					onBeforeDelete={handleBeforeDelete}
					onSelectionChange={handleSelectionChange}
					onNodeClick={handleNodeClick}
					onEdgeClick={handleEdgeClick}
				>
					<Background />
					{showControls && <DiagramControls />}
					{showMiniMap && <MiniMap />}
				</ReactFlow>
			</styles.Container>
		);
	}
);

Canvas.displayName = 'Canvas';

export const canvasPropTypes = {
	/** Nodos a renderizar en el diagrama. */
	nodes: PropTypes.arrayOf(DiagramNodeShape),
	/** Edges a renderizar en el diagrama. */
	edges: PropTypes.arrayOf(DiagramEdgeShape),
	/** Map de tipo de nodo → componente React custom. */
	nodeComponents: PropTypes.objectOf(PropTypes.elementType),
	/** Configuración del canvas. `readOnly` deshabilita drag y conexiones. `showControls` muestra los controles de zoom. `showMiniMap` muestra el minimapa. `resizableNodes` habilita el redimensionado de nodos. `fitViewOnMount` encuadra todo el diagrama al montar (default true); se ignora automáticamente si `initialZoom` está definido. `initialZoom` centra el diagrama sobre sus nodos con ese zoom exacto al montar (clampeado contra `minZoom`/`maxZoom` efectivos). `minZoom`/`maxZoom` son pass-through a React Flow; sin declarar, se usan los defaults del componente (`0.5`/`2`). Si son inválidos (`<= 0`, o `maxZoom <= minZoom`) se ignoran ambos, se cae a esos defaults y se emite un warning en desarrollo. */
	config: PropTypes.shape({
		readOnly: PropTypes.bool,
		showControls: PropTypes.bool,
		showMiniMap: PropTypes.bool,
		resizableNodes: PropTypes.bool,
		fitViewOnMount: PropTypes.bool,
		initialZoom: PropTypes.number,
		minZoom: PropTypes.number,
		maxZoom: PropTypes.number
	}),
	/** Cambios de posición (`{ type: 'position', id, position }`), dimensiones (`{ type: 'dimensions', id, width, height }`) o eliminación (`{ type: 'remove', id }`) de nodos. */
	onNodesChange: PropTypes.func,
	/** Eliminación de edges (`{ type: 'remove', id }`). */
	onEdgesChange: PropTypes.func,
	/** El usuario conectó dos nodos. Recibe `{ source, target, sourceHandle, targetHandle }`. */
	onConnect: PropTypes.func,
	/** El usuario reconectó un edge a otro nodo. Recibe `{ id, source, target, sourceHandle, targetHandle }`. */
	onReconnect: PropTypes.func,
	/** El usuario hizo click en un nodo. Recibe `{ id, type, data }`. */
	onNodeClick: PropTypes.func,
	/** El usuario hizo click en un edge. Recibe `{ id, data }`. */
	onEdgeClick: PropTypes.func,
	/** Intercepta el borrado antes de que ocurra. Recibe `{ nodes: [{ id, type, data }], edges: [{ id, data }] }` con los elementos a borrar. Async. Retornar `false` cancela; `true` borra todo; un objeto `{ nodes, edges }` borra solo ese subconjunto (borrado selectivo, identificado por `id`). */
	onBeforeDelete: PropTypes.func,
	/** Se llama cuando cambia la selección. Recibe `{ nodes: [{id}], edges: [{id}] }` con los elementos seleccionados en ese momento. */
	onSelectionChange: PropTypes.func
};

Canvas.propTypes = canvasPropTypes;

export default Canvas;
