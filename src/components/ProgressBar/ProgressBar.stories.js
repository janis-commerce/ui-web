import React from 'react';
import ProgressBar from './ProgressBar';
import palette from 'theme/palette';

const control = {
	type: 'select',
	options: Object.keys(palette).reduce((options, colorName) => {
		options[colorName] = palette[colorName];
		return options;
	}, {})
};

export default {
	title: 'Components/ProgressBar',
	component: ProgressBar,
	parameters: {
		layout: 'centered'
	},
	argTypes: {
		color: { control }
	}
};

const Template = (args) => {
	return (
		<div style={{ width: '500px' }}>
			<ProgressBar {...args} />
		</div>
	);
};

const baseArgs = {
	value: 35
};

export const Base = Template.bind({});
export const Animated = Template.bind({});

Base.args = {
	...baseArgs
};

Animated.args = {
	...baseArgs,
	animated: true,
	color: 'fizzGreen'
};
