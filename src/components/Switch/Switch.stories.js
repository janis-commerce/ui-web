import React from 'react';
import Switch from './Switch';

export default {
	title: 'Components/Switch',
	component: Switch,
	parameters: {
		layout: 'centered'
	}
};

const Template = (args) => <Switch {...args} />;

const baseArgs = {
	autoComplete: false,
	defaultChecked: false,
	disabled: false,
	value: false,
	checked: false
};

export const Base = Template.bind({});

Base.args = {
	...baseArgs
};
