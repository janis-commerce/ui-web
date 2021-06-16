import React from 'react';
import PropTypes from 'prop-types';
import styled from './styles';

const Chip = ({
	backgroundColor,
	borderColor,
	children,
	disabled,
	onClick,
	selected,
	styles,
	textColor,
	variant,
	...props
}) => (
	<styled.Chip
		as={props.onClick ? 'button' : 'div'}
		backgroundColor={backgroundColor}
		borderColor={borderColor}
		hasText={!!children || children === 0}
		disabled={disabled}
		clickable={onClick && !disabled}
		onClick={disabled ? undefined : onClick}
		selected={selected}
		styles={styles}
		textColor={textColor}
		variant={variant}
		{...props}
	>
		<styled.Children>{children}</styled.Children>
	</styled.Chip>
);
Chip.propTypes = {
	backgroundColor: PropTypes.shape({
		type: PropTypes.string,
		color: PropTypes.string
	}),
	borderColor: PropTypes.shape({
		type: PropTypes.string,
		color: PropTypes.string
	}),
	children: PropTypes.node,
	/** Si es true deshabilita el chip */
	disabled: PropTypes.bool,
	onClick: PropTypes.func,
	onDelete: PropTypes.func,
	/** Si es true mantiene el chip seleccionado */
	selected: PropTypes.bool,
	styles: PropTypes.oneOfType([
		PropTypes.string,
		PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.string, PropTypes.func]))
	]),
	textColor: PropTypes.shape({
		type: PropTypes.string,
		color: PropTypes.string
	}),
	variant: PropTypes.oneOf(['contained', 'outlined', 'status'])
};

Chip.defaultProps = {
	backgroundColor: '',
	borderColor: '',
	disabled: false,
	selected: false,
	textColor: '',
	variant: 'outlined'
};

export default Chip;
