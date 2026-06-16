import React from 'react';
import PropTypes from 'prop-types';
import { Handle, Position } from '@xyflow/react';

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
		const handles = props.data?._handles ?? DEFAULT_HANDLES;
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

export default withHandles;
