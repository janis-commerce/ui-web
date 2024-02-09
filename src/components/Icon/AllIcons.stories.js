import React from 'react';
import { validColors } from 'components/Button/utils';
import Icons from './Icons';

const control = {
	type: 'select',
	options: validColors.reduce((options, color) => {
		options[color] = color;
		return options;
	}, {})
};

export default {
	title: 'Theme/Icons',
	component: Icons,
	argTypes: {
		color: { control }
	}
};

const Template = (args) => <Icons {...args} />;

const baseArgs = {
	color: 'black'
};

export const IconList = Template.bind({});

IconList.args = {
	...baseArgs
};
