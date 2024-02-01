import React from 'react';
import { validColors } from 'components/Button/utils';
import Input from './Input';

const control = {
	type: 'select',
	options: validColors.reduce((options, color) => {
		options[color] = color;
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
