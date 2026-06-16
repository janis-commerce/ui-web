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
		className: ['dc-node', `dc-node--${node.type}`, node.className].filter(Boolean).join(' '),
		data: { ...node.data, _handleColor: node.handleConfig?.color, _handles: node.handleConfig?.positions }
	})),
	edges: edges.map(
		({
			id,
			source,
			target,
			sourceHandle,
			targetHandle,
			animated,
			label,
			style,
			data,
			lineType,
			arrowStart,
			arrowEnd,
			selectedStyle,
			className
		}) => ({
			id,
			source,
			target,
			sourceHandle,
			targetHandle,
			animated,
			label,
			style,
			className: ['dc-edge', lineType && `dc-edge--${lineType}`, className].filter(Boolean).join(' '),
			data: { ...data, _selectedStyle: selectedStyle },
			type: LINE_TYPE_MAP[lineType] || 'bezier',
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

const formatConnection = ({ source, target }) => ({ source, target });

export default { formatInput, formatOutput, formatConnection, Component };
