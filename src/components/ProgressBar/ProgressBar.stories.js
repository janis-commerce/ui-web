import React, { useState, useEffect } from 'react';
import ProgressBar from './ProgressBar';

export default {
	title: 'Components/ProgressBar',
	component: ProgressBar,
	parameters: {
		layout: 'centered'
	}
};

const AnimatedTemplate = (args) => {
	const [progress, setProgress] = useState(0);

	useEffect(() => {
		const interval = setInterval(() => {
			setProgress((prev) => {
				const next = prev + 1;
				return next > 100 ? 0 : next;
			});
		}, 50);

		return () => clearInterval(interval);
	}, []);

	return (
		<div style={{ width: '300px' }}>
			<ProgressBar {...args} progress={progress} />
		</div>
	);
};

export const Animated = AnimatedTemplate.bind({});
Animated.args = {
	isCompleted: false,
	hasError: false
};
``;
