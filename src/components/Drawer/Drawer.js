import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Icon from 'components/Icon';
import styled from './styles';

const Modal = ({ open, position, handleClose, transitionDuration, children }) => {
	const [drawerWidthOnClose, setDrawerWidthOnClose] = useState('0');

	// useEffect to check the drawer width when drawer__content is closed
	useEffect(() => {
		const drawerContentEl = document.querySelector('.drawer__content');
		if (!drawerContentEl) return;
		const setWrapperWidth = () => {
			const isContentVisible = drawerContentEl.checkVisibility({ checkVisibilityCSS: true });
			setDrawerWidthOnClose(isContentVisible ? '100%' : '0');
		};
		drawerContentEl.addEventListener('transitionend', setWrapperWidth);
	}, []);

	const drawerStyles = {
		...(open && { width: '100%' }),
		...(!open && { width: drawerWidthOnClose }),
		...((position === 'right' || position === 'left') && {
			top: 0
		}),
		[position]: 0
	};

	const overlayStyles = {
		zIndex: 100
	};

	const contentStyles = {
		zIndex: overlayStyles.zIndex + 1
	};

	return (
		<styled.Drawer className="drawer" style={drawerStyles}>
			<styled.Checkbox
				type="checkbox"
				id="drawer__checkbox"
				checked={open}
				onChange={handleClose}
			/>
			<styled.Content
				open={open}
				position={position}
				transitionDuration={transitionDuration}
				className="drawer__content"
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
			</styled.Content>
			<styled.Overlay
				htmlFor="drawer__checkbox"
				className="drawer__overlay"
				style={overlayStyles}
			/>
		</styled.Drawer>
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
