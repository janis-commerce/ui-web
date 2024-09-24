import React from 'react';
import palette from 'theme/palette';
import Icons from './Icons';

const control = {
	type: 'select',
	options: Object.keys(palette).reduce((options, colorName) => {
		options[colorName] = palette[colorName];
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
