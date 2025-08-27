import React from 'react';
import PropTypes from 'prop-types';
import useProgressBar from 'hooks/useProgressBar';
import { getColor } from 'theme/utils';
import styled from './styles';

const ProgressBar = ({ value = 50, animated = false, height = 16, color = 'blue' }) => {
	const { progress } = useProgressBar(value, animated);

	return (
		<styled.Bar height={height}>
			<styled.ProgressFill value={progress} color={getColor(color)} />
		</styled.Bar>
	);
};

ProgressBar.propTypes = {
	value: PropTypes.number.isRequired,
	animated: PropTypes.bool,
	height: PropTypes.number,
	color: PropTypes.string
};

export default ProgressBar;
