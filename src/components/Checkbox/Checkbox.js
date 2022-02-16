import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Icon from '../Icon';
import styled from './styles';

const Checkbox = ({
	autoComplete,
	disabled,
	defaultChecked,
	onChange,
	rounded,
	styles,
	value,
	...props
}) => {
	const [checked, setChecked] = useState(!!value || defaultChecked);

	const handleChange = (event) => {
		const { checked: checkEvent } = event.target;

		setChecked(checkEvent);

		onChange(checkEvent);
	};

	const { checked: conntroledChecked = checked } = props;

	return (
		<styled.Container checked={conntroledChecked} rounded={rounded} styles={styles}>
			<styled.Input
				{...props}
				type="checkbox"
				disabled={disabled}
				autoComplete={autoComplete ? 'on' : 'off'}
				onChange={handleChange}
			/>
			<Icon name="check_bold" styles={styled.iconCheckStyles} rounded={rounded} />
		</styled.Container>
	);
};

Checkbox.propTypes = {
	/** Si es true habilita el autoComplete */
	autoComplete: PropTypes.bool,
	/** Valor del componente. Requerido en caso de usarlo como controlled component */
	checked: PropTypes.bool,
	/** Si está checkeado por defecto, en caso de usarlo como uncontrolled component */
	defaultChecked: PropTypes.bool,
	/** Callback disparado al cambiar el valor de checked */
	onChange: PropTypes.func,
	rounded: PropTypes.bool,
	/** Si es true, deshabilita el componente */
	disabled: PropTypes.bool,
	styles: PropTypes.shape({}),
	/** Valor del componente en caso de mostrar contenido ya existente */
	value: PropTypes.oneOfType([PropTypes.bool, PropTypes.number])
};

Checkbox.defaultProps = {
	autoComplete: false,
	onChange: () => null
};

export default Checkbox;
