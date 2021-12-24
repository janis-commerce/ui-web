import React from 'react';
import PropTypes from 'prop-types';
import { styles as stylesPropType, iconName as iconNamePropType } from 'utils/prop-types';
import Icon from 'components/Icon';
import StyledButton from './styles';
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
	...props
}) => (
	<StyledButton
		color={color}
		iconColor={iconColor || fontColor}
		fontColor={fontColor}
		hasText={!!children && !hideLabel}
		rounded={rounded}
		styles={styles}
		variant={variant}
		hasIcon={!!icon}
		tabIndex="0"
		{...props}
	>
		{icon && <Icon name={icon} size={iconSize} />}
		{children}
	</StyledButton>
);

Button.propTypes = {
	/** Contenido del boton */
	children: PropTypes.node,
	/** Color del boton */
	color: PropTypes.oneOf(validColors),
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
	styles: stylesPropType,
	variant: PropTypes.oneOf(['cleaned', 'contained', 'outlined'])
};

Button.defaultProps = {
	color: 'blue',
	rounded: false,
	fontColor: 'white',
	variant: 'cleaned'
};

export default Button;
