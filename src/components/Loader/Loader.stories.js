import React from 'react';
import palette from 'theme/palette';
import Loader from './Loader';
import { icons } from 'components';
import { EFFECTS } from './styles';

const control = {
	type: 'select',
	options: Object.keys(palette).reduce((options, colorName) => {
		options[colorName] = palette[colorName];
		return options;
	}, {})
};

export default {
	title: 'Components/Loader',
	component: Loader,
	parameters: {
		layout: 'centered'
	},
	argTypes: {
		color: { control },
		icon: {
			options: Object.keys(icons)
		},
		effect: {
			options: Object.keys(EFFECTS)
		}
	}
};

const Template = (args) => <Loader {...args} />;

const baseArgs = {
	icon: 'iso_janis',
	color: 'blue',
	effect: 'blur'
};

export const Blur = Template.bind({});

Blur.args = {
	...baseArgs
};
