import React from 'react';
import AvatarGroup from './AvatarGroup';
import users from './usersMock.json';

export default {
	title: 'Components/AvatarGroup',
	component: AvatarGroup,
	parameters: {
		layout: 'centered'
	}
};

const Template = (args) => <AvatarGroup {...args} />;

const baseArgs = {
	users
};

export const WithTwoAvatars = Template.bind({});
export const WithFourAvatars = Template.bind({});
export const ShowFull = Template.bind({});

WithTwoAvatars.args = {
	...baseArgs,
	usersToDisplay: 2
};

WithFourAvatars.args = {
	...baseArgs,
	usersToDisplay: 4
};

ShowFull.args = {
	...baseArgs,
	showFull: true
};
