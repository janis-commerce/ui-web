import React from 'react';
import HTML from './HTML';

export default {
	title: 'Components/HTML',
	component: HTML,
	parameters: {
		layout: 'centered'
	}
};

const Template = (args) => <HTML {...args} />;

const baseArgs = {
	code: '',
	height: 'medium',
	name: 'Test',
	sourceURL: 'https://app.janisdev.in/',
	width: 100,
	errorMessage: 'Error'
};

export const Base = Template.bind({});

Base.args = {
	...baseArgs
};
