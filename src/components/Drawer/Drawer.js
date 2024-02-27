import React from 'react';
import PropTypes from 'prop-types';
import Icon from 'components/Icon';
import styled from './styles';

const Modal = ({ open, position, handleClose, transitionDuration, children }) => {
	const overlayStyles = {
		zIndex: 100
	};

	const contentStyles = {
		zIndex: overlayStyles.zIndex + 1
	};

	return (
		<>
			<styled.Drawer
				open={open}
				position={position}
				transitionDuration={transitionDuration}
				className="drawer"
				style={contentStyles}
			>
				<styled.Header>
					{handleClose && typeof handleClose === 'function' && (
						<styled.CloseBtn onClick={handleClose}>
							<Icon className="close-btn" name="cross_light" width={24} height={24} />
						</styled.CloseBtn>
					)}
				</styled.Header>
				<styled.Children>{children}</styled.Children>
			</styled.Drawer>
			<styled.Overlay
				className="drawer__overlay"
				transitionDuration={transitionDuration}
				style={overlayStyles}
			/>
		</>
	);
};

export default Modal;

Modal.propTypes = {
	open: PropTypes.bool,
	position: PropTypes.string,
	handleClose: PropTypes.func,
	transitionDuration: PropTypes.number,
	children: PropTypes.node
};

Modal.defaultProps = {
	open: false,
	position: 'right',
	handleClose: () => {},
	transitionDuration: 500
};
