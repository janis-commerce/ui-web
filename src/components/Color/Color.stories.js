import React from 'react';
import viewsPalette from 'theme/palette';
import Color from './Color';

const control = {
	type: 'select',
	options: Object.keys(viewsPalette).reduce((options, colorName) => {
		options[colorName] = viewsPalette[colorName];
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
