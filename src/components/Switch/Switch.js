import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Icon from 'components/Icon';
import styled from './styles';

const Switch = ({
	autoComplete,
	defaultChecked,
	disabled,
	id,
	name,
	onChange,
	value,
	...props
}) => {
	const [checked, setChecked] = useState(!!value || defaultChecked);

	const handleChange = (event) => {
		const { checked: checkEvent } = event.target;

		setChecked(checkEvent);

		onChange(checkEvent);
	};

	const { checked: controledChecked = checked } = props;

	return (
		<styled.OuterContainer disabled={disabled} checked={checked}>
			<styled.Input
				checked={controledChecked}
				id={id}
				name={name}
				type="checkbox"
				disabled={disabled}
				autoComplete={autoComplete ? 'on' : 'off'}
				onChange={handleChange}
			/>
			<styled.Container checked={controledChecked} disabled={disabled}>
				<styled.Ball checked={controledChecked} disabled={disabled}>
					<Icon
						checked={controledChecked}
						disabled={disabled}
						name="check_bold"
						size={16}
						styles={styled.iconCheckStyles}
					/>
				</styled.Ball>
			</styled.Container>
		</styled.OuterContainer>
	);
};

Switch.propTypes = {
	/** Si es true habilita el autoComplete */
	autoComplete: PropTypes.bool,
	/** Valor del componente. Requerido en caso de usarlo como controlled component */
	checked: PropTypes.oneOfType([PropTypes.bool, PropTypes.number]),
	/** Si está checkeado por defecto, en caso de usarlo como uncontrolled component */
	defaultChecked: PropTypes.bool,
	/** Id del campo */
	id: PropTypes.string,
	/** Atributo name del input */
	name: PropTypes.string,
	/** Callback disparado al cambiar el valor de checked */
	onChange: PropTypes.func,
	/** Si es true, deshabilita el componente */
	disabled: PropTypes.bool,
	/** Valor del componente en caso de mostrar contenido ya existente */
	value: PropTypes.oneOfType([PropTypes.bool, PropTypes.number])
};

Switch.defaultProps = {
	defaultChecked: false,
	disabled: false,
	autoComplete: false,
	onChange: () => null
};

export default Switch;
