import React from 'react';
import ProgressBar from './ProgressBar';
import palette from 'theme/palette';

export default {
	title: 'Components/ProgressBar',
	component: ProgressBar,
	parameters: {
		layout: 'centered'
	},
	argTypes: {
		color: {
			control: { type: 'select' },
			options: Object.keys(palette)
		}
	}
};

const Template = (args) => {
	return (
		<div style={{ width: '500px' }}>
			<ProgressBar {...args} />
		</div>
	);
};

export const Base = Template.bind({});
export const Animated = Template.bind({});

Base.args = {
	value: 10
};

Animated.args = {
	value: 2,
	maxValue: 5,
	animated: true,
	color: 'fizzGreen'
};
