import React, { forwardRef, useEffect, useImperativeHandle, useMemo } from 'react';
import PropTypes from 'prop-types';
import {
	ReactFlow,
	ReactFlowProvider,
	Background,
	Controls,
	MiniMap,
	Handle,
	Position,
	useNodesState,
	useEdgesState,
	useReactFlow
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';

const POSITION_MAP = {
	top: Position.Top,
	right: Position.Right,
	bottom: Position.Bottom,
	left: Position.Left
};

const DEFAULT_HANDLES = ['top', 'right', 'bottom', 'left'];

const withHandles = (NodeComponent) => {
	const WrappedNode = (props) => {
		const handleColor = props.data?._handleColor || '#b1b1b7';
		const handles = props.data?._handles || DEFAULT_HANDLES;
		return (
			<>
				{handles.map((id) => (
					<Handle
						key={id}
						id={id}
						type="source"
						position={POSITION_MAP[id] || Position.Top}
						style={{ background: handleColor, width: 10, height: 10, border: '2px solid #fff' }}
					/>
				))}
				<NodeComponent {...props} />
			</>
		);
	};
	WrappedNode.displayName = `WithHandles(${
		NodeComponent.displayName || NodeComponent.name || 'Component'
	})`;
	WrappedNode.propTypes = {
		data: PropTypes.shape({
			_handleColor: PropTypes.string,
			_handles: PropTypes.arrayOf(PropTypes.string)
		})
	};
	return WrappedNode;
};

const FlowInner = forwardRef(
	(
		{
			nodes,
			edges,
			nodeComponents,
			config,
			onNodesChange,
			onEdgesChange,
			onConnect,
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
				proOptions={{ hideAttribution: true }}
				nodesDraggable={!readOnly}
				nodesConnectable={!readOnly}
				elementsSelectable={!readOnly}
				connectionMode="loose"
				onNodesChange={(changes) => {
					handleNodesChange(changes);
					onNodesChange?.(changes);
				}}
				onEdgesChange={(changes) => {
					handleEdgesChange(changes);
					onEdgesChange?.(changes);
				}}
				onConnect={(connection) => {
					const edge = onConnect?.(connection);
					if (edge) setRfEdges((eds) => [...eds, edge]);
				}}
				onNodeClick={(_event, node) => {
					// eslint-disable-next-line no-unused-vars
					const { _handleColor, _handles, ...data } = node.data || {};
					onNodeClick?.(node.id, data);
				}}
				onEdgeClick={(_event, edge) => onEdgeClick?.(edge.id, edge.data)}
			>
				<Background />
				{showControls && <Controls />}
				{showMiniMap && <MiniMap />}
			</ReactFlow>
		);
	}
);

FlowInner.displayName = 'FlowInner';

FlowInner.propTypes = {
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
	onNodeClick: PropTypes.func,
	onEdgeClick: PropTypes.func
};

const ReactFlowComponent = forwardRef((props, ref) => (
	<ReactFlowProvider>
		<FlowInner ref={ref} {...props} />
	</ReactFlowProvider>
));

ReactFlowComponent.displayName = 'ReactFlowComponent';

export default ReactFlowComponent;
