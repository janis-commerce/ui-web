import React from 'react';
import palette from 'theme/palette';
import Avatar from './Avatar';

const control = {
	type: 'select',
	options: Object.keys(palette).reduce((options, colorName) => {
		options[colorName] = palette[colorName];
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
		mainColor: { control },
		size: {
			type: 'select',
			options: ['small', 'medium', 'large', 'extralarge', 'auto']
		}
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
	url: 'https://cdn.id.janis.in/client-images/5ec2d43b70cd6700077c3aa1/964e3f17-17fd-4fa1-856f-79c5345176ae.png'
};

Default.args = {
	...baseArgs
};

WithName.args = {
	...baseArgs,
	firstname: 'Esteban',
	lastname: 'Quito'
};
