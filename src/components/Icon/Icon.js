import React from 'react';
import PropTypes from 'prop-types';
import icons from './icons.json';
import styled from './styles';

const Icon = ({
	color,
	name,
	size: sizeProp,
	styles,
	pathStyles,
	width,
	height,
	viewBox,
	...props
}) => {
	const iconProps = icons[name];

	if (!iconProps) return null;

	const { path, size: defaultSize } = iconProps;
	const size = sizeProp || defaultSize;

	if (!path) return null;

	return (
		<styled.Svg
			width={width || size}
			height={height || size}
			styles={styles}
			color={color}
			viewBox={viewBox}
			size={size}
			{...props}
		>
			<styled.Path d={path} styles={pathStyles} />
		</styled.Svg>
	);
};

Icon.propTypes = {
	/** Nombre del icono */
	name: PropTypes.oneOf(Object.keys(icons)).isRequired,
	/** Color en vista normal, para definir el hover utilizar styles */
	color: PropTypes.string,
	/** Click handler */
	onClick: PropTypes.func,
	/** Ancho y alto para iconos cuadrados. El valor por defecto viene definido como tag en el json de la fuente de iconos */
	size: PropTypes.number,
	/** Estilos para el elemento svg, deben ser definidos con backticks ``,
	 si incluye interpolaciones con funciones se debe utilizar la función css de styled-comopnents */
	styles: PropTypes.oneOfType([
		PropTypes.string,
		PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.string, PropTypes.func]))
	]),
	/** Estilos para el elemento path, deben ser definidos con backticks ``,
	 si incluye interpolaciones con funciones se debe utilizar la función css de styled-comopnents */
	pathStyles: PropTypes.oneOfType([
		PropTypes.string,
		PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.string, PropTypes.func]))
	]),
	/** Ancho del icono */
	width: PropTypes.number,
	/** Alto del icono */
	height: PropTypes.number,
	/** ViewBox del icono */
	viewBox: PropTypes.string
};

Icon.defaultProps = {
	color: '#000',
	viewBox: '0 0 1024 1024'
};

export default Icon;
