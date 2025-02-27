import React from 'react';
import styles, { EFFECTS } from './styles';
import Icon from 'components/Icon';
import PropTypes from 'prop-types';
import { icons } from 'components';

const Loader = ({ children, icon = 'iso_janis', color = 'blue', effect = 'none' }) => {
	return (
		<styles.Container effect={effect}>
			<styles.LoaderContainer>
				{children || (
					<>
						<styles.Loader color={color} />
						<Icon name={icon} color={color} size={65} />
					</>
				)}
			</styles.LoaderContainer>
		</styles.Container>
	);
};

Loader.propTypes = {
	/** Contenido del boton */
	children: PropTypes.node,
	/** Nombre del icono */
	icon: PropTypes.oneOf(Object.keys(icons)),
	/** Color en vista normal, para definir el hover utilizar styles */
	color: PropTypes.string,
	/** Efecto del fondo del Loader */
	effect: PropTypes.oneOf(Object.keys(EFFECTS))
};

export default Loader;
