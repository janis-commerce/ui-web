import React from 'react';
import Textarea from './Textarea';

export default {
	title: 'Components/Textarea',
	component: Textarea,
	parameters: {
		layout: 'centered'
	}
};

const Template = (args) => <Textarea {...args} />;

const baseArgs = {
	label: 'que',
	error: false,
	disabled: false,
	placeholder: 'Placeholder',
	autoComplete: false,
	errorMessage: 'Error',
	hasFloatingLabel: false,
	isTranslateActive: false,
	defaultValue: ''
};

export const Base = Template.bind({});

Base.args = {
	...baseArgs
};
