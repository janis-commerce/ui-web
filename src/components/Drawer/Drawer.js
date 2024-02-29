import React, { useRef } from 'react';
import PropTypes from 'prop-types';
import Icon from 'components/Icon';
import ClickAwayListener from '../ClickAwayListener';
import styled from './styles';

const Drawer = ({
	open,
	position,
	handleClose,
	transitionDuration,
	fullScreen,
	closeOnClickAway,
	children
}) => {
	const overlayStyles = {
		zIndex: 100
	};

	const contentStyles = {
		zIndex: overlayStyles.zIndex + 1
	};

	const drawerRef = useRef(null);

	const handleOnClickAway = () => {
		if (open) handleClose();
	};

	return (
		<ClickAwayListener onClickAway={closeOnClickAway && handleOnClickAway}>
			<>
				<styled.Drawer
					open={open}
					position={position}
					transitionDuration={transitionDuration}
					fullScreen={fullScreen}
					className="drawer"
					style={contentStyles}
					ref={drawerRef}
				>
					<styled.Content className="drawer__content">
						<styled.Header>
							{handleClose && typeof handleClose === 'function' && (
								<styled.CloseBtn onClick={handleClose}>
									<Icon className="close-btn" name="cross_light" width={24} height={24} />
								</styled.CloseBtn>
							)}
						</styled.Header>
						<styled.Children>{children}</styled.Children>
					</styled.Content>
				</styled.Drawer>
				<styled.Overlay
					className="drawer__overlay"
					transitionDuration={transitionDuration}
					style={overlayStyles}
				/>
			</>
		</ClickAwayListener>
	);
};

export default Drawer;

Drawer.propTypes = {
	open: PropTypes.bool,
	position: PropTypes.string,
	handleClose: PropTypes.func,
	transitionDuration: PropTypes.number,
	fullScreen: PropTypes.bool,
	closeOnClickAway: PropTypes.bool,
	children: PropTypes.node
};

Drawer.defaultProps = {
	open: false,
	position: 'right',
	handleClose: () => {},
	transitionDuration: 500,
	fullScreen: false,
	closeOnClickAway: true
};
