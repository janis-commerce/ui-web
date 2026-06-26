import React from 'react';
import PropTypes from 'prop-types';
import { SmoothStepEdge, BezierEdge, StraightEdge } from '@xyflow/react';

const withSelected = (NativeEdge) => {
	const WrappedEdge = ({ data, selected, style, className, ...props }) => {
		const mergedStyle =
			selected && data?.selectedStyle ? { ...style, ...data.selectedStyle } : style;
		const mergedClassName = [className, selected && 'dc-edge--selected'].filter(Boolean).join(' ');
		return <NativeEdge {...props} data={data} style={mergedStyle} className={mergedClassName} />;
	};
	WrappedEdge.displayName = `WithSelected(${NativeEdge.displayName || NativeEdge.name || 'Edge'})`;
	WrappedEdge.propTypes = {
		selected: PropTypes.bool,
		style: PropTypes.object,
		className: PropTypes.string,
		data: PropTypes.shape({ selectedStyle: PropTypes.object })
	};
	return WrappedEdge;
};

export const EDGE_TYPES = {
	smoothstep: withSelected(SmoothStepEdge),
	bezier: withSelected(BezierEdge),
	straight: withSelected(StraightEdge)
};

const ArrowShape = PropTypes.shape({
	type: PropTypes.oneOf(['outlined', 'contained']),
	size: PropTypes.number
});

export const DiagramEdgeShape = PropTypes.shape({
	id: PropTypes.string.isRequired,
	source: PropTypes.string.isRequired,
	target: PropTypes.string.isRequired,
	sourceHandle: PropTypes.oneOf(['top', 'right', 'bottom', 'left']),
	targetHandle: PropTypes.oneOf(['top', 'right', 'bottom', 'left']),
	lineType: PropTypes.oneOf(['step', 'curved', 'straight']),
	animated: PropTypes.bool,
	label: PropTypes.string,
	style: PropTypes.object,
	selectedStyle: PropTypes.object,
	arrowStart: ArrowShape,
	arrowEnd: ArrowShape,
	data: PropTypes.object
});
