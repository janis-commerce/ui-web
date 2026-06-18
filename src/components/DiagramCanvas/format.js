import { MarkerType } from '@xyflow/react';

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

export const mapNodesToRf = (nodes) =>
	nodes.map(({ width, height, handleConfig, data, ...node }) => ({
		...node,
		...(width != null && { width }),
		...(height != null && { height }),
		className: `dc-node ${node.type}`,
		data: { ...data, handleConfig }
	}));

export const mapEdgesToRf = (edges) =>
	edges.map(
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
			selectedStyle
		}) => ({
			id,
			source,
			target,
			sourceHandle,
			targetHandle,
			animated,
			label,
			style,
			className: ['dc-edge', lineType].filter(Boolean).join(' '),
			data: { ...data, selectedStyle },
			type: LINE_TYPE_MAP[lineType] || 'bezier',
			markerStart: translateMarker(arrowStart),
			markerEnd: translateMarker(arrowEnd)
		})
	);

export const readNodeChanges = (changes) =>
	changes
		.map((change) => {
			if (change.type === 'position') {
				if (change.dragging || !change.position) return null;
				return { type: 'position', id: change.id, position: change.position };
			}
			if (change.type === 'dimensions') {
				if (change.resizing || !change.dimensions) return null;
				return { type: 'dimensions', id: change.id, ...change.dimensions };
			}
			if (change.type === 'remove') return { type: 'remove', id: change.id };
			return null;
		})
		.filter(Boolean);

export const readEdgeChanges = (changes) =>
	changes
		.map((change) => {
			if (change.type === 'remove') return { type: 'remove', id: change.id };
			return null;
		})
		.filter(Boolean);
