import React from 'react';
import Checkbox from './Checkbox';

export default {
	title: 'Components/Checkbox',
	component: Checkbox,
	parameters: {
		layout: 'centered'
	}
};

const Template = (args) => <Checkbox {...args} />;

const baseArgs = {
	autoComplete: false,
	disabled: false,
	defaultChecked: true,
	rounded: false,
	value: 6
};

export const Base = Template.bind({});

Base.args = {
	...baseArgs
};
