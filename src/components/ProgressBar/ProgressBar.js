import React from 'react';
import PropTypes from 'prop-types';
import Progress from 'react-progressbar';
import palette from 'theme/palette';
const ProgressBar = ({ progress = 0, isCompleted = false, hasError = false, height = '6px' }) => {
	const backgroundColor = palette.lightGrey;
	const barColor = isCompleted ? palette.green : palette.blue;

	return (
		<Progress
			completed={progress}
			style={{ backgroundColor }}
			color={hasError ? palette.red : barColor}
			height={height}
		/>
	);
};

ProgressBar.propTypes = {
	progress: PropTypes.number,
	isCompleted: PropTypes.bool,
	hasError: PropTypes.bool,
	height: PropTypes.string
};

export default ProgressBar;
