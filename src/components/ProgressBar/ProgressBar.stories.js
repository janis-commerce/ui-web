import React, { useState, useEffect } from 'react';
import ProgressBar from './ProgressBar';
import Button from 'components/Button';

export default {
	title: 'Components/ProgressBar',
	component: ProgressBar,
	parameters: {
		layout: 'centered'
	}
};

// eslint-disable-next-line react/prop-types
const AnimatedTemplate = ({ onComplete, ...args }) => {
	const [progress, setProgress] = useState(0);
	const [completed, setCompleted] = useState(false);
	const [shouldRun, setShouldRun] = useState(true);

	useEffect(() => {
		if (!shouldRun) return;

		const interval = setInterval(() => {
			setProgress((prev) => {
				const next = prev + 1;
				if (next >= 100) {
					clearInterval(interval);
					setCompleted(true);
					setShouldRun(false);
					if (onComplete) onComplete();
				}
				return next >= 100 ? 100 : next;
			});
		}, 30);

		return () => clearInterval(interval);
	}, [shouldRun]);

	return (
		<div style={{ width: '300px' }}>
			<ProgressBar
				{...args}
				progress={progress}
				isCompleted={completed}
				hasError={completed && args.hasError}
			/>
			<Button
				icon="refresh"
				onClick={() => {
					setProgress(0);
					setCompleted(false);
					setShouldRun(true);
				}}
			/>
		</div>
	);
};

export const CompletedSuccess = AnimatedTemplate.bind({});
export const CompletedError = AnimatedTemplate.bind({});

CompletedSuccess.args = {
	isCompleted: true,
	hasError: false
};

CompletedError.args = {
	isCompleted: false,
	hasError: true
};
