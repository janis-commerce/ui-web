import React from 'react';
import palette from 'theme/palette';
import icons from '../Icon/icons.json';
import Chip from './Chip';

const control = {
	type: 'select',
	options: Object.keys(palette).reduce((options, colorName) => {
		options[colorName] = palette[colorName];
		return options;
	}, {})
};

export default {
	title: 'Components/Chip',
	component: Chip,
	parameters: {
		layout: 'centered'
	},
	argTypes: {
		variant: ['cleaned', 'contained', 'outlined'],
		backgroundColor: { control },
		textColor: { control },
		borderColor: { control },
		iconColor: { control },
		icon: {
			type: 'select',
			options: Object.keys(icons)
		}
	}
};

const Template = (args) => <Chip {...args} />;

const baseArgs = {
	children: 'Chip',
	variant: 'contained',
	onDelete: false
};

export const Contained = Template.bind({});
export const Outlined = Template.bind({});
export const Status = Template.bind({});
export const WithoutVariant = Template.bind({});

Contained.args = {
	...baseArgs
};

Outlined.args = {
	...baseArgs,
	variant: 'outlined'
};

Status.args = {
	...baseArgs,
	variant: 'status'
};

WithoutVariant.args = {
	...baseArgs,
	variant: ''
};
