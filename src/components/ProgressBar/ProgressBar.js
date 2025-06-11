import React from 'react';
import PropTypes from 'prop-types';
import Progress from 'react-progressbar';
import palette from 'theme/palette';

const ProgressBar = ({ progress = 0, isCompleted = false, hasError = false, config = {} }) => {
	const {
		height = '6px',
		background = palette.lightGrey,
		success = palette.green,
		error = palette.red,
		defaultColor = palette.blue
	} = config;

	const barColor = isCompleted ? success : defaultColor;
	const color = hasError ? error : barColor;

	return (
		<Progress
			completed={progress}
			style={{ backgroundColor: background }}
			color={color}
			height={height}
		/>
	);
};

ProgressBar.propTypes = {
	progress: PropTypes.number,
	isCompleted: PropTypes.bool,
	hasError: PropTypes.bool,
	config: PropTypes.shape({
		height: PropTypes.string,
		background: PropTypes.string,
		success: PropTypes.string,
		error: PropTypes.string,
		defaultColor: PropTypes.string
	})
};

export default ProgressBar;
