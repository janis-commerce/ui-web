import React from 'react';
import PropTypes from 'prop-types';
import Icon from 'components/Icon';
import styled from './styles';

const Chip = ({
	backgroundColor,
	borderColor,
	children,
	disabled,
	icon,
	iconColor,
	iconSize,
	onClick,
	onDelete,
	selected,
	textColor,
	variant,
	hasLink,
	...props
}) => {
	if (!children && !icon) return null;

	return (
		<styled.Chip
			as={props.onClick ? 'button' : 'div'}
			backgroundColor={backgroundColor}
			borderColor={borderColor}
			hasIcon={!!icon}
			disabled={disabled}
			clickable={(onClick || onDelete) && !disabled}
			onClick={disabled ? undefined : onClick}
			selected={selected}
			textColor={textColor}
			variant={variant}
			hasLink={hasLink}
			onlyIcon={!children && icon}
			{...props}
		>
			{icon && <Icon className="chip-icon" name={icon} color={iconColor} size={iconSize} />}
			{children && <styled.Children>{children}</styled.Children>}
			{onDelete && (
				<styled.DeleteButton type="button" onClick={onDelete}>
					<Icon color="black" className="delete-button" name="cross_circle_flat" size={16} />
				</styled.DeleteButton>
			)}
		</styled.Chip>
	);
};

Chip.propTypes = {
	/** Permite cambiar el color de fondo del componente */
	backgroundColor: PropTypes.string,
	/** Permite modificar el color del borde del componente */
	borderColor: PropTypes.string,
	/** Hijo del componente */
	children: PropTypes.node,
	/** Si es true deshabilita el chip */
	disabled: PropTypes.bool,
	/** Icono a mostrar dentro del chip */
	icon: PropTypes.string,
	/** Permite modificar el color del icono */
	iconColor: PropTypes.string,
	/** Permite modificar el tamaño del icono */
	iconSize: PropTypes.number,
	/** Función a ejecutar al clickar */
	onClick: PropTypes.func,
	/** Función a ejecutar para borrar */
	onDelete: PropTypes.func,
	/** Si es true mantiene el chip seleccionado */
	selected: PropTypes.bool,
	/** Permite aplicar estilos adicionales */
	styles: PropTypes.oneOfType([
		PropTypes.string,
		PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.string, PropTypes.func]))
	]),
	/** Permite modificar el color del texto */
	textColor: PropTypes.string,
	/** Permite seleccionar las distintas variantes del componente */
	variant: PropTypes.oneOf(['contained', 'outlined', 'status']),
	/** Si es true aplica eventos de link */
	hasLink: PropTypes.bool
};

Chip.defaultProps = {
	backgroundColor: '',
	borderColor: '',
	disabled: false,
	iconColor: 'grey',
	selected: false,
	textColor: '',
	variant: 'outlined',
	hasLink: false
};

export default Chip;
