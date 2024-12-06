import React, { useState } from 'react';
import { HexColorPicker } from 'react-colorful';
import { debounce } from 'utils';
import PropTypes from 'prop-types';
import styled from './styles';

const DEFAULT_COLOR = '#ffffff';

const ColorPicker = ({ color, isCollapsable, onChange, errorMessage, error }) => {
	const [colorValue, setColor] = useState(color);
	const [pickerVisible, setPickerVisible] = useState(false);

	const toggleStateVisible = () => {
		setPickerVisible((prevState) => !prevState);
	};

	const handleChange = (value) => {
		setColor(value);
		onChange(value);
	};

	const handleClosePicker = () => setPickerVisible(false);

	const change = debounce(handleChange, 100);

	const value = colorValue || DEFAULT_COLOR;

	if (isCollapsable) {
		return (
			<styled.Wrapper>
				<styled.ClickableWrapper
					data-test="collapsible-picker"
					color={value}
					role="presentation"
					onClick={toggleStateVisible}
					error={error}
				>
					<styled.Input
						value={colorValue}
						fullWidth
						onChange={({ target }) => handleChange(target.value)}
						errorMessage={errorMessage}
						error={error}
					/>
				</styled.ClickableWrapper>
				{pickerVisible && (
					<>
						<styled.ClosePickerWrapper onClick={handleClosePicker} role="presentation" />
						<styled.PickerWrapper>
							<HexColorPicker color={value} onChange={change} />
						</styled.PickerWrapper>
					</>
				)}
			</styled.Wrapper>
		);
	}

	return <HexColorPicker data-test="simple-picker" color={value} onChange={change} />;
};

ColorPicker.propTypes = {
	/** Código del color */
	color: PropTypes.string,
	onChange: PropTypes.func,
	/** Agrega un input con el código del color */
	isCollapsable: PropTypes.bool,
	/** Si es true, el input del colapsable aparece con error */
	error: PropTypes.bool,
	/** Texto a mostrar en caso de error */
	errorMessage: PropTypes.string
};

ColorPicker.defaultProps = {
	color: DEFAULT_COLOR,
	onChange: () => null,
	isCollapsable: false
};

export default ColorPicker;
