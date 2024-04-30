import React from 'react';
import viewsPalette from 'theme/palette';
import Avatar from './Avatar';
import AvatarDocs from './AvatarDocs';

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
		layout: 'centered',
		docs: {
			page: () => <AvatarDocs title="Avatar" />
		}
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
