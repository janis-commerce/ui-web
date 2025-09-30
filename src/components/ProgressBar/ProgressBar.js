import React from 'react';
import PropTypes from 'prop-types';
import { getColor } from 'theme/utils';
import { isNumber } from 'utils';
import styled from './styles';

const isValidValue = (value) => !!value && isNumber(value) && value > 0;

const ProgressBar = ({
	value,
	maxValue = 100,
	animated = false,
	duration = 1,
	height = 16,
	color = 'blue'
}) => {
	if (!isValidValue(value) || !isValidValue(maxValue) || value > maxValue) return null;

	const progress = Math.max(0, Math.min(maxValue, value));

	return (
		<styled.Bar
			height={height}
			role="progressbar"
			aria-valuemin={0}
			aria-valuemax={maxValue}
			aria-valuenow={animated ? undefined : Math.round(progress)}
			aria-busy={animated || undefined}
			aria-valuetext={animated ? undefined : `${Math.round((progress / maxValue) * 100)}%`}
		>
			<styled.ProgressFill
				value={progress}
				maxValue={maxValue}
				animated={animated}
				duration={duration}
				color={getColor(color)}
			/>
		</styled.Bar>
	);
};

ProgressBar.propTypes = {
	/* Valor numérico actual del progreso */
	value: PropTypes.number.isRequired,
	/* Valor máximo permitido del progreso */
	maxValue: PropTypes.number,
	/* Activa la animación del relleno */
	animated: PropTypes.bool,
	/* Duración de la animación en segundos */
	duration: PropTypes.number,
	/* Altura de la barra en píxeles */
	height: PropTypes.number,
	/* Color del progreso (nombre de paleta o valor CSS) */
	color: PropTypes.string
};

export default ProgressBar;
