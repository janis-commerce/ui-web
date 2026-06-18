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
