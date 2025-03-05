import React from 'react';
import palette from 'theme/palette';
import Spinner from './Spinner';

const control = {
	type: 'select',
	options: Object.keys(palette).reduce((options, colorName) => {
		options[colorName] = palette[colorName];
		return options;
	}, {})
};

export default {
	title: 'Components/Spinner',
	component: Spinner,
	parameters: {
		layout: 'centered'
	},
	argTypes: {
		config: {
			color: { control }
		}
	}
};

const Template = (args) => <Spinner {...args} />;

const baseArgs = {
	config: { color: 'blue', duration: 2, size: 50, thickness: 18 }
};

export const Basic = Template.bind({});

Basic.args = {
	...baseArgs
};
