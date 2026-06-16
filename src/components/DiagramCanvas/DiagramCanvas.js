import React, { forwardRef, useCallback, useImperativeHandle, useMemo, useRef } from 'react';
import PropTypes from 'prop-types';
import { ADAPTERS, DEFAULT_ADAPTER } from './adapters';
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
	showMiniMap: true
};

const defaultViewportOpts = { duration: 400, padding: 0.3 };
const defaultZoomOpts = { duration: 400 };

const DiagramCanvas = forwardRef(
	(
		{
			nodes = [],
			edges = [],
			nodeComponents = {},
			config = {},
			adapter = DEFAULT_ADAPTER,
			onNodesChange = () => {},
			onEdgesChange = () => {},
			onConnect = () => {},
			onNodeClick = () => {},
			onEdgeClick = () => {},
			className
		},
		ref
	) => {
		const { formatInput, formatOutput, formatConnection, Component } = ADAPTERS[adapter];

		const adapterRef = useRef();

		useImperativeHandle(
			ref,
			() => ({
				zoomToNode: (id, opts) =>
					adapterRef.current?.zoomToNode(id, { ...defaultViewportOpts, ...opts }),
				zoomToEdge: (id, opts) =>
					adapterRef.current?.zoomToEdge(id, { ...defaultViewportOpts, ...opts }),
				fitView: (opts) => adapterRef.current?.fitView({ ...defaultViewportOpts, ...opts }),
				zoomIn: (opts) => adapterRef.current?.zoomIn({ ...defaultZoomOpts, ...opts }),
				zoomOut: (opts) => adapterRef.current?.zoomOut({ ...defaultZoomOpts, ...opts })
			}),
			[]
		);

		const mergedConfig = useMemo(() => ({ ...defaultConfig, ...config }), [config]);

		const { nodes: formattedNodes, edges: formattedEdges } = useMemo(
			() => formatInput(nodes, edges),
			[nodes, edges]
		);

		const handleNodesChange = useCallback(
			(changes) => {
				if (!changes.length) return;
				const { nodes: nodeDelta } = formatOutput(changes, []);
				if (nodeDelta.length) onNodesChange?.(nodeDelta);
			},
			[formatOutput, onNodesChange]
		);

		const handleEdgesChange = useCallback(
			(changes) => {
				if (!changes.length) return;
				const { edges: edgeDelta } = formatOutput([], changes);
				if (edgeDelta.length) onEdgesChange?.(edgeDelta);
			},
			[formatOutput, onEdgesChange]
		);

		const handleConnect = useCallback(
			(rfConnection) => {
				const edge = onConnect?.(formatConnection(rfConnection));
				if (!edge) return undefined;
				const {
					edges: [rfEdge]
				} = formatInput([], [edge]);
				return rfEdge;
			},
			[onConnect, formatInput, formatConnection]
		);

		return (
			<styles.Container className={className}>
				<Component
					ref={adapterRef}
					nodes={formattedNodes}
					edges={formattedEdges}
					nodeComponents={nodeComponents}
					config={mergedConfig}
					onNodesChange={handleNodesChange}
					onEdgesChange={handleEdgesChange}
					onConnect={handleConnect}
					onNodeClick={onNodeClick}
					onEdgeClick={onEdgeClick}
				/>
			</styles.Container>
		);
	}
);

DiagramCanvas.displayName = 'DiagramCanvas';

const DiagramNodeShape = PropTypes.shape({
	id: PropTypes.string.isRequired,
	type: PropTypes.string.isRequired,
	position: PropTypes.shape({
		x: PropTypes.number.isRequired,
		y: PropTypes.number.isRequired
	}).isRequired,
	handleColor: PropTypes.string,
	handles: PropTypes.arrayOf(PropTypes.oneOf(['top', 'right', 'bottom', 'left'])),
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
	style: PropTypes.object,
	arrowStart: ArrowShape,
	arrowEnd: ArrowShape,
	data: PropTypes.object
});

DiagramCanvas.propTypes = {
	/** Nodos a renderizar en el diagrama. */
	nodes: PropTypes.arrayOf(DiagramNodeShape),
	/** Edges a renderizar en el diagrama. */
	edges: PropTypes.arrayOf(DiagramEdgeShape),
	/** Map de tipo de nodo → componente React custom. */
	nodeComponents: PropTypes.objectOf(PropTypes.elementType),
	/** Configuración del canvas. `readOnly` deshabilita drag y conexiones. `showControls` muestra los controles de zoom. `showMiniMap` muestra el minimapa. */
	config: PropTypes.shape({
		readOnly: PropTypes.bool,
		showControls: PropTypes.bool,
		showMiniMap: PropTypes.bool
	}),
	adapter: PropTypes.oneOf(Object.keys(ADAPTERS)),
	/** Cambios de posición (`{ type: 'position', id, position }`) o eliminación (`{ type: 'remove', id }`) de nodos. */
	onNodesChange: PropTypes.func,
	/** Eliminación de edges (`{ type: 'remove', id }`). */
	onEdgesChange: PropTypes.func,
	/** El usuario conectó dos nodos. Recibe `{ source, target, sourceHandle, targetHandle }` y debe retornar el edge completo a agregar. */
	onConnect: PropTypes.func,
	/** El usuario hizo click en un nodo. Recibe `(id, data)`. */
	onNodeClick: PropTypes.func,
	/** El usuario hizo click en un edge. Recibe `(id, data)`. */
	onEdgeClick: PropTypes.func,
	className: PropTypes.string
};

export default DiagramCanvas;
