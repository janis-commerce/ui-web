import React from 'react';
import viewsPalette from 'theme/palette';
import Avatar from './Avatar';

const control = {
	type: 'select',
	options: Object.keys(viewsPalette).reduce((options, colorName) => {
		options[colorName] = viewsPalette[colorName];
		return options;
	}, {})
};

export default {
	title: 'Components/Avatar',
	component: Avatar,
	parameters: {
		layout: 'centered'
	},
	argTypes: {
		mainColor: { control }
	}
};

const Template = (args) => <Avatar {...args} />;

const baseArgs = {
	rounded: true,
	size: 'large'
};

export const WithURL = Template.bind({});
export const Default = Template.bind({});
export const WithName = Template.bind({});

WithURL.args = {
	...baseArgs,
	url: 'https://cdn.id.janis.in/client-images/5ec2d43b70cd6700077c3aa1/0cdc0141-1f76-465a-8a06-8512b289eb85.png'
};

Default.args = {
	...baseArgs
};

WithName.args = {
	...baseArgs,
	firstname: 'Esteban',
	lastname: 'Quito'
};
