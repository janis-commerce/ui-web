import { MarkerType } from '@xyflow/react';
import Component from './Component';

const MARKER_MAP = {
	outlined: MarkerType.Arrow,
	contained: MarkerType.ArrowClosed
};

const LINE_TYPE_MAP = {
	step: 'smoothstep',
	curved: 'bezier',
	straight: 'straight'
};

const translateMarker = (marker) => {
	if (!marker) return undefined;
	return { type: MARKER_MAP[marker.type] || marker.type, color: marker.color };
};

const formatInput = (nodes, edges) => ({
	nodes: nodes.map((node) => ({
		...node,
		data: { ...node.data, _handleColor: node.handleColor, _handles: node.handles }
	})),
	edges: edges.map(
		({
			id,
			source,
			target,
			sourceHandle,
			targetHandle,
			animated,
			style,
			data,
			lineType,
			arrowStart,
			arrowEnd
		}) => ({
			id,
			source,
			target,
			sourceHandle,
			targetHandle,
			animated,
			style,
			data,
			type: LINE_TYPE_MAP[lineType] || 'default',
			markerStart: translateMarker(arrowStart),
			markerEnd: translateMarker(arrowEnd)
		})
	)
});

const translateNodeChange = (change) => {
	if (change.type === 'position') {
		if (change.dragging || !change.position) return null;
		return { type: 'position', id: change.id, position: change.position };
	}
	if (change.type === 'remove') return { type: 'remove', id: change.id };
	return null;
};

const translateEdgeChange = (change) => {
	if (change.type === 'remove') return { type: 'remove', id: change.id };
	return null;
};

const formatOutput = (rfNodesChanges, rfEdgesChanges) => ({
	nodes: rfNodesChanges.map(translateNodeChange).filter(Boolean),
	edges: rfEdgesChanges.map(translateEdgeChange).filter(Boolean)
});

const formatConnection = ({ source, target, sourceHandle, targetHandle }) => ({
	source,
	target,
	sourceHandle,
	targetHandle
});

export default { formatInput, formatOutput, formatConnection, Component };
