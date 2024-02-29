import React from 'react';
import Button from './Button';
import { validColors } from './utils';
import icons from '../Icon/icons.json';

const control = {
	type: 'select',
	options: validColors.reduce((options, color) => {
		options[color] = color;
		return options;
	}, {})
};

export default {
	title: 'Components/Button',
	component: Button,
	parameters: {
		layout: 'centered'
	},
	argTypes: {
		variant: ['cleaned', 'contained', 'outlined'],
		fontColor: { control },
		color: { control },
		icon: {
			options: Object.keys(icons)
		},
		iconColor: { control }
	}
};

const Template = (args) => <Button {...args} />;

const baseArgs = {
	children: 'Button',
	hideLabel: false,
	iconColor: 'black',
	iconSize: 24,
	rounded: false,
	variant: 'contained'
};

export const Contained = Template.bind({});
export const Outlined = Template.bind({});
export const Cleaned = Template.bind({});
export const WithIcon = Template.bind({});

Contained.args = {
	...baseArgs,
	iconColor: 'white'
};

Outlined.args = {
	...baseArgs,
	variant: 'outlined'
};

Cleaned.args = {
	...baseArgs,
	variant: 'cleaned'
};

WithIcon.args = {
	...baseArgs,
	icon: 'box',
	iconColor: 'white'
};
