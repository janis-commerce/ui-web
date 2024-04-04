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
	url: '	https://janiscommerce.atlassian.net/wiki/aa-avatar/6345ddf753df3c01231fe83f'
};

Default.args = {
	...baseArgs
};

WithName.args = {
	...baseArgs,
	firstname: 'Esteban',
	lastname: 'Quito'
};
