import React from 'react';
import Color from './Color';
import { validColors } from 'components/Button/utils';

const control = {
	type: 'select',
	options: validColors.reduce((options, color) => {
		options[color] = color;
		return options;
	}, {})
};

export default {
	title: 'Components/Color',
	component: Color,
	parameters: {
		layout: 'centered'
	},
	argTypes: {
		color: control
	}
};

const Template = (args) => <Color {...args} />;

const baseArgs = {
	color: 'blue',
	showLabel: false
};

export const Base = Template.bind({});

Base.args = {
	...baseArgs
};
