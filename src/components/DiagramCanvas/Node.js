import React from 'react';
import PropTypes from 'prop-types';
import { Handle, NodeResizer, Position } from '@xyflow/react';

const POSITION_MAP = {
	top: Position.Top,
	right: Position.Right,
	bottom: Position.Bottom,
	left: Position.Left
};

const DEFAULT_HANDLES = ['top', 'right', 'bottom', 'left'];

const withHandles = (NodeComponent, { resizable = false } = {}) => {
	const WrappedNode = ({ width, height, selected, data }) => {
		const { handleConfig, ...nodeData } = data || {};
		const handleColor = handleConfig?.color || '#b1b1b7';
		const handles = handleConfig?.positions ?? DEFAULT_HANDLES;
		const sizeStyle =
			resizable && width != null && height != null ? { width: '100%', height: '100%' } : undefined;
		return (
			<>
				{resizable && <NodeResizer minWidth={40} minHeight={40} isVisible={selected} />}
				<NodeComponent data={nodeData} selected={selected} style={sizeStyle} />
				{handles.map((id) => (
					<Handle
						key={id}
						id={id}
						type="source"
						position={POSITION_MAP[id] || Position.Top}
						style={{
							background: handleColor,
							width: 10,
							height: 10,
							border: '2px solid #fff'
						}}
					/>
				))}
			</>
		);
	};
	WrappedNode.displayName = `WithHandles(${
		NodeComponent.displayName || NodeComponent.name || 'Component'
	})`;
	WrappedNode.propTypes = {
		width: PropTypes.number,
		height: PropTypes.number,
		selected: PropTypes.bool,
		data: PropTypes.object
	};
	return WrappedNode;
};

export const DiagramNodeShape = PropTypes.shape({
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

export default withHandles;
