import React, { forwardRef, useEffect, useImperativeHandle, useMemo } from 'react';
import PropTypes from 'prop-types';
import {
	ReactFlow,
	ReactFlowProvider,
	Background,
	Controls,
	MiniMap,
	useNodesState,
	useEdgesState,
	useReactFlow,
	reconnectEdge
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import withHandles from './Node';
import { EDGE_TYPES } from './Edge';

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
		const { readOnly, showControls, showMiniMap } = config;
		const rf = useReactFlow();
		const [rfNodes, setRfNodes, handleNodesChange] = useNodesState(nodes);
		const [rfEdges, setRfEdges, handleEdgesChange] = useEdgesState(edges);

		useEffect(() => {
			setRfNodes(nodes);
		}, [nodes]);
		useEffect(() => {
			setRfEdges(edges);
		}, [edges]);

		useImperativeHandle(
			ref,
			() => ({
				zoomToNode: (id, opts) => rf.fitView({ nodes: [{ id }], maxZoom: 1.5, ...opts }),
				zoomToEdge: (id, opts) => {
					const edge = rf.getEdge(id);
					if (edge) rf.fitView({ nodes: [{ id: edge.source }, { id: edge.target }], ...opts });
				},
				fitView: (opts) => rf.fitView(opts),
				zoomIn: (opts) => rf.zoomIn(opts),
				zoomOut: (opts) => rf.zoomOut(opts)
			}),
			[rf]
		);

		const nodeTypes = useMemo(
			() =>
				Object.fromEntries(
					Object.entries(nodeComponents).map(([type, Component]) => [type, withHandles(Component)])
				),
			[nodeComponents]
		);
		return (
			<ReactFlow
				nodes={rfNodes}
				edges={rfEdges}
				nodeTypes={nodeTypes}
				edgeTypes={EDGE_TYPES}
				proOptions={{ hideAttribution: true }}
				nodesDraggable={!readOnly}
				nodesConnectable={!readOnly}
				elementsSelectable={!readOnly}
				connectionMode="loose"
				onNodesChange={(nodeChanges) => {
					handleNodesChange(nodeChanges);
					onNodesChange?.(nodeChanges);
				}}
				onEdgesChange={(edgeChanges) => {
					handleEdgesChange(edgeChanges);
					onEdgesChange?.(edgeChanges);
				}}
				onConnect={(connection) => {
					const edge = onConnect?.(connection);
					if (edge) setRfEdges((eds) => [...eds, edge]);
				}}
				onReconnect={(oldEdge, newConnection) => {
					setRfEdges((eds) => reconnectEdge(oldEdge, newConnection, eds));
					onReconnect?.(oldEdge, newConnection);
				}}
				onNodeClick={(_event, node) => {
					// eslint-disable-next-line no-unused-vars
					const { _handleColor, _handles, ...data } = node.data || {};
					onNodeClick?.(node.id, data);
				}}
				onEdgeClick={(_event, edge) => {
					// eslint-disable-next-line no-unused-vars
					const { _selectedStyle, ...data } = edge.data || {};
					onEdgeClick?.(edge.id, data);
				}}
			>
				<Background />
				{showControls && <Controls />}
				{showMiniMap && <MiniMap />}
			</ReactFlow>
		);
	}
);

Canvas.displayName = 'Canvas';

Canvas.propTypes = {
	nodes: PropTypes.array.isRequired,
	edges: PropTypes.array.isRequired,
	nodeComponents: PropTypes.objectOf(PropTypes.elementType).isRequired,
	config: PropTypes.shape({
		readOnly: PropTypes.bool,
		showControls: PropTypes.bool,
		showMiniMap: PropTypes.bool
	}).isRequired,
	onNodesChange: PropTypes.func,
	onEdgesChange: PropTypes.func,
	onConnect: PropTypes.func,
	onReconnect: PropTypes.func,
	onNodeClick: PropTypes.func,
	onEdgeClick: PropTypes.func
};

const ReactFlowCanvas = forwardRef((props, ref) => (
	<ReactFlowProvider>
		<Canvas ref={ref} {...props} />
	</ReactFlowProvider>
));

ReactFlowCanvas.displayName = 'ReactFlowCanvas';

export default ReactFlowCanvas;
