import React from 'react';
import Icon from './Icon';
import { validColors } from 'components/Button/utils';
import icons from './icons.json';

const control = {
	type: 'select',
	options: validColors.reduce((options, color) => {
		options[color] = color;
		return options;
	}, {})
};

export default {
	title: 'Components/Icon',
	component: Icon,
	parameters: {
		layout: 'centered'
	},
	argTypes: {
		color: { control },
		name: {
			options: Object.keys(icons)
		}
	}
};

const Template = (args) => <Icon {...args} />;

const baseArgs = {
	color: 'black',
	name: 'box',
	pathStyles: '',
	width: 50,
	height: 50,
	viewBox: '0 0 1024 1024'
};

export const Box = Template.bind({});
export const Alarm_clock = Template.bind({});
export const UserClosed = Template.bind({});

Box.args = {
	...baseArgs
};

Alarm_clock.args = {
	...baseArgs,
	color: 'green',
	name: 'alarm_clock'
};

UserClosed.args = {
	...baseArgs,
	color: 'blue',
	name: 'user_closed'
};
