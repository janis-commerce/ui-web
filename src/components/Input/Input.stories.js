import React from 'react';
import viewsPalette from 'theme/palette';
import Input from './Input';

const control = {
	type: 'select',
	options: Object.keys(viewsPalette).reduce((options, colorName) => {
		options[colorName] = viewsPalette[colorName];
		return options;
	}, {})
};

export default {
	title: 'Components/Input',
	component: Input,
	parameters: {
		layout: 'centered'
	},
	argTypes: {
		background: control
	}
};

const Template = (args) => <Input {...args} />;

const baseArgs = {
	icon: 'box',
	error: false,
	disabled: false,
	placeholder: 'Placeholder',
	errorMessage: 'Error',
	autoComplete: false,
	hasFloatingLabel: false,
	value: 'hola',
	isTranslateActive: false
};

export const Base = Template.bind({});

Base.args = {
	...baseArgs
};
