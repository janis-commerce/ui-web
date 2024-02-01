import React from 'react';
import ColorPicker from './ColorPicker';

export default {
	title: 'Components/ColorPicker',
	component: ColorPicker,
	parameters: {
		layout: 'centered'
	}
};

const Template = (args) => <ColorPicker {...args} />;

const baseArgs = {
	color: '#ffffff',
	isCollapsable: false,
	errorMessage: 'Error',
	error: false
};

export const Base = Template.bind({});

Base.args = {
	...baseArgs
};
