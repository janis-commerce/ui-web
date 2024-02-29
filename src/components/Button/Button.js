import React from 'react';
import PropTypes from 'prop-types';
import { styles as stylesPropType, iconName as iconNamePropType } from 'utils/prop-types';
import Icon from 'components/Icon';
import styled from './styles';
import { validColors } from './utils';

const Button = ({
	children,
	color,
	hideLabel,
	icon,
	iconColor,
	iconSize,
	fontColor,
	rounded,
	styles,
	variant,
	disabled,
	...props
}) => (
	<styled.Button
		color={color}
		iconColor={iconColor || fontColor}
		fontColor={fontColor}
		hasText={!!children && !hideLabel}
		rounded={rounded}
		styles={styles}
		variant={variant}
		hasIcon={!!icon}
		tabIndex="0"
		disabled={disabled}
		{...props}
	>
		{icon && <Icon className="button-icon" name={icon} size={iconSize} />}
		{!hideLabel && children}
	</styled.Button>
);

Button.propTypes = {
	/** Contenido del boton */
	children: PropTypes.node,
	/** Color del boton */
	color: PropTypes.oneOf(validColors),
	/** Mostrar o no el texto */
	hideLabel: PropTypes.bool,
	/** Nombre del icono */
	icon: iconNamePropType,
	/** Color del icono */
	iconColor: PropTypes.string,
	/** Tamaño del icono */
	iconSize: PropTypes.number,
	/** color del texto */
	fontColor: PropTypes.string,
	/** Si es true, el boton tiene los bordes redondeados */
	rounded: PropTypes.bool,
	/** Habilita y deshabilita el boton  */
	disabled: PropTypes.bool,
	/** Permite aplicar estilos de css  */
	styles: stylesPropType,
	/** Variante de boton */
	variant: PropTypes.oneOf(['cleaned', 'contained', 'outlined'])
};

Button.defaultProps = {
	color: 'blue',
	rounded: false,
	variant: 'cleaned',
	disabled: false
};

export default Button;
