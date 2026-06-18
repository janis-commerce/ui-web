import React, { forwardRef, useCallback, useImperativeHandle, useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import {
	ReactFlow,
	ReactFlowProvider,
	Background,
	MiniMap,
	useReactFlow,
	applyNodeChanges,
	applyEdgeChanges
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import withHandles from './Node';
import { EDGE_TYPES } from './Edge';
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
 */

const defaultConfig = {
	readOnly: true,
	showControls: true,
	showMiniMap: true,
	resizableNodes: false
};

const defaultViewportOpts = { duration: 400, padding: 0.3 };
const defaultZoomOpts = { duration: 400 };

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
			onEdgeClick
		},
		ref
	) => {
		const { readOnly, showControls, showMiniMap, resizableNodes } = config;
		const rf = useReactFlow();

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
					const existing = prev.find((n) => n.id === node.id);
					// Preservar measured para que RF no pierda dimensiones calculadas
					return existing?.measured ? { ...node, measured: existing.measured } : node;
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
				zoomOut: (opts) => rf.zoomOut({ ...defaultZoomOpts, ...opts })
			}),
			[rf]
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
				setInternalNodes((prev) => applyNodeChanges(changes, prev));
				const delta = readNodeChanges(changes);
				if (delta.length) onNodesChange?.(delta);
			},
			[onNodesChange]
		);

		const handleEdgesChangeCallback = useCallback(
			(changes) => {
				const filtered = changes.filter((c) => c.type !== 'add');
				setInternalEdges((prev) => applyEdgeChanges(filtered, prev));
				const delta = readEdgeChanges(filtered);
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
				onReconnect?.(oldEdge.id, { source: newConnection.source, target: newConnection.target });
			},
			[onReconnect]
		);

		return (
			<styles.Container>
				<ReactFlow
					nodes={internalNodes}
					edges={internalEdges}
					nodeTypes={nodeTypes}
					edgeTypes={EDGE_TYPES}
					proOptions={{ hideAttribution: true }}
					nodesDraggable={!readOnly}
					nodesConnectable={!readOnly}
					elementsSelectable={!readOnly}
					connectionMode="loose"
					onNodesChange={handleNodesChangeCallback}
					onEdgesChange={handleEdgesChangeCallback}
					onConnect={handleConnect}
					onReconnect={handleReconnect}
					onNodeClick={(_event, node) => onNodeClick?.(node.id, node.data)}
					onEdgeClick={(_event, edge) => {
						// eslint-disable-next-line no-unused-vars
						const { selectedStyle, ...data } = edge.data || {};
						onEdgeClick?.(edge.id, data);
					}}
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

const DiagramNodeShape = PropTypes.shape({
	id: PropTypes.string.isRequired,
	type: PropTypes.string.isRequired,
	position: PropTypes.shape({
		x: PropTypes.number.isRequired,
		y: PropTypes.number.isRequired
	}).isRequired,
	width: PropTypes.number,
	height: PropTypes.number,
	handleConfig: PropTypes.shape({
		color: PropTypes.string,
		positions: PropTypes.arrayOf(PropTypes.oneOf(['top', 'right', 'bottom', 'left']))
	}),
	data: PropTypes.object
});

const ArrowShape = PropTypes.shape({
	type: PropTypes.oneOf(['outlined', 'contained']),
	color: PropTypes.string
});

const DiagramEdgeShape = PropTypes.shape({
	id: PropTypes.string.isRequired,
	source: PropTypes.string.isRequired,
	target: PropTypes.string.isRequired,
	lineType: PropTypes.oneOf(['step', 'curved', 'straight']),
	animated: PropTypes.bool,
	label: PropTypes.string,
	style: PropTypes.object,
	selectedStyle: PropTypes.object,
	arrowStart: ArrowShape,
	arrowEnd: ArrowShape,
	data: PropTypes.object
});

// PropTypes declarados en DiagramCanvas (componente público) y reutilizados acá.

const DiagramCanvas = forwardRef((props, ref) => {
	const mergedConfig = useMemo(() => ({ ...defaultConfig, ...props.config }), [props.config]);
	return (
		<ReactFlowProvider>
			<Canvas
				ref={ref}
				nodes={props.nodes ?? []}
				edges={props.edges ?? []}
				nodeComponents={props.nodeComponents ?? {}}
				config={mergedConfig}
				onNodesChange={props.onNodesChange}
				onEdgesChange={props.onEdgesChange}
				onConnect={props.onConnect}
				onReconnect={props.onReconnect}
				onNodeClick={props.onNodeClick}
				onEdgeClick={props.onEdgeClick}
			/>
		</ReactFlowProvider>
	);
});

DiagramCanvas.displayName = 'DiagramCanvas';

DiagramCanvas.propTypes = {
	/** Nodos a renderizar en el diagrama. */
	nodes: PropTypes.arrayOf(DiagramNodeShape),
	/** Edges a renderizar en el diagrama. */
	edges: PropTypes.arrayOf(DiagramEdgeShape),
	/** Map de tipo de nodo → componente React custom. */
	nodeComponents: PropTypes.objectOf(PropTypes.elementType),
	/** Configuración del canvas. `readOnly` deshabilita drag y conexiones. `showControls` muestra los controles de zoom. `showMiniMap` muestra el minimapa. `resizableNodes` habilita el redimensionado de nodos. */
	config: PropTypes.shape({
		readOnly: PropTypes.bool,
		showControls: PropTypes.bool,
		showMiniMap: PropTypes.bool,
		resizableNodes: PropTypes.bool
	}),
	/** Cambios de posición (`{ type: 'position', id, position }`), dimensiones (`{ type: 'dimensions', id, width, height }`) o eliminación (`{ type: 'remove', id }`) de nodos. */
	onNodesChange: PropTypes.func,
	/** Eliminación de edges (`{ type: 'remove', id }`). */
	onEdgesChange: PropTypes.func,
	/** El usuario conectó dos nodos. Recibe `{ source, target, sourceHandle, targetHandle }`. */
	onConnect: PropTypes.func,
	/** El usuario reconectó un edge a otro nodo. Recibe `(id, { source, target })`. */
	onReconnect: PropTypes.func,
	/** El usuario hizo click en un nodo. Recibe `(id, data)`. */
	onNodeClick: PropTypes.func,
	/** El usuario hizo click en un edge. Recibe `(id, data)`. */
	onEdgeClick: PropTypes.func
};

Canvas.propTypes = DiagramCanvas.propTypes;

export default DiagramCanvas;
