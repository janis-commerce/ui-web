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
	children,
	...props
}) => {
	const drawerRef = useRef(null);

	return (
		<ClickAwayListener onClickAway={closeOnClickAway && open && handleClose}>
			<>
				<styled.Drawer
					open={open}
					position={position}
					transitionDuration={transitionDuration}
					fullScreen={fullScreen}
					className="drawer"
					ref={drawerRef}
					{...props}
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
				<styled.Overlay className="drawer__overlay" transitionDuration={transitionDuration} />
			</>
		</ClickAwayListener>
	);
};

export default Drawer;

Drawer.propTypes = {
	/** Abre o cierra el Drawer */
	open: PropTypes.bool,
	/** Posición del drawer en la pantalla */
	position: PropTypes.string,
	/** Función para cerrar el drawer desde la cruz */
	handleClose: PropTypes.func,
	/** Duración de la transición al abrir y cerrar el drawer */
	transitionDuration: PropTypes.number,
	/** Pantalla completa */
	fullScreen: PropTypes.bool,
	/** El drawer se cierra al clickear por fuera del mismo */
	closeOnClickAway: PropTypes.bool,
	/** Contenido del drawer */
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
