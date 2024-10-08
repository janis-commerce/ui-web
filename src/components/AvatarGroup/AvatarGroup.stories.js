import React from 'react';
import AvatarGroup from './AvatarGroup';
import users from './usersMock.json';
import palette from 'theme/palette';

const control = {
	type: 'select',
	options: Object.keys(palette).reduce((options, colorName) => {
		options[colorName] = palette[colorName];
		return options;
	}, {})
};

export default {
	title: 'Components/AvatarGroup',
	component: AvatarGroup,
	parameters: {
		layout: 'centered'
	},
	argTypes: {
		badgeColor: { control }
	}
};

const Template = (args) => <AvatarGroup {...args} />;

const baseArgs = {
	users
};

export const WithTwoAvatars = Template.bind({});
export const WithFourAvatars = Template.bind({});
export const WithSixAvatars = Template.bind({});
export const ShowFull = Template.bind({});

WithTwoAvatars.args = {
	...baseArgs,
	usersToDisplay: 2
};

WithFourAvatars.args = {
	...baseArgs,
	usersToDisplay: 4
};

WithSixAvatars.args = {
	...baseArgs,
	usersToDisplay: 6,
	showFull: true
};

ShowFull.args = {
	...baseArgs,
	showFull: true,
	usersToDisplay: 10
};
