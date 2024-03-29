import React from 'react';
import PropTypes from 'prop-types';
import { getColor } from 'theme/utils';
import styled from './styles';

const Color = ({ color, showLabel }) => {
	if (!color) return null;

	const colorCode = getColor(color);

	return (
		<styled.Wrapper>
			<styled.ColorSample color={colorCode} />
			{showLabel && <styled.Label color={colorCode}>{colorCode}</styled.Label>}
		</styled.Wrapper>
	);
};

Color.propTypes = {
	/** Permite modificar el color del componente */
	color: PropTypes.string,
	/** Si es true, muestra el código del color */
	showLabel: PropTypes.bool
};

export default Color;
