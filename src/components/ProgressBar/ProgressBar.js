import React from 'react';
import PropTypes from 'prop-types';
import useProgressBar from 'hooks/useProgressBar';
import { getColor } from 'theme/utils';
import styled from './styles';

const ProgressBar = ({ value = 10, animated = false, height = 16, color = 'blue' }) => {
	const { progress } = useProgressBar(value, animated);

	return (
		<styled.Progress
			value={progress}
			max={100}
			height={height}
			color={getColor(color)}
			aria-busy={animated || undefined}
			aria-valuetext={animated ? undefined : `${Math.round(progress)}%`}
		/>
	);
};

ProgressBar.propTypes = {
	value: PropTypes.number,
	animated: PropTypes.bool,
	height: PropTypes.number,
	color: PropTypes.string
};

export default ProgressBar;
