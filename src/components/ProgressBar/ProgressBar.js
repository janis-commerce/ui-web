import React from 'react';
import PropTypes from 'prop-types';
import useProgressBar from 'hooks/useProgressBar';
import { getColor } from 'theme/utils';
import styled from './styles';

const ProgressBar = ({ value = 10, animated = false, height = 16, color = 'blue' }) => {
	const { progress } = useProgressBar(value, animated);

	return (
		<styled.Bar
			height={height}
			role="progressbar"
			aria-valuemin={0}
			aria-valuemax={100}
			aria-valuenow={animated ? undefined : Math.round(progress)}
			aria-busy={animated || undefined}
		>
			<styled.ProgressFill value={progress} color={getColor(color)} />
		</styled.Bar>
	);
};

ProgressBar.propTypes = {
	value: PropTypes.number,
	animated: PropTypes.bool,
	height: PropTypes.number,
	color: PropTypes.string
};

export default ProgressBar;
