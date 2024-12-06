import React from 'react';
import icons from '../Icon/icons.json';
import Link from './Link';

export default {
	title: 'Components/Link',
	component: Link,
	parameters: {
		layout: 'centered'
	},
	argTypes: {
		icon: {
			type: 'select',
			options: Object.keys(icons)
		}
	}
};

const Template = (args) => <Link {...args} />;

const baseArgs = {
	children: 'Link',
	href: 'https://app.janisdev.in/',
	target: '_blank',
	icon: 'box'
};

export const LinkWithIcon = Template.bind({});
export const Onlyink = Template.bind({});

LinkWithIcon.args = {
	...baseArgs
};

Onlyink.args = {
	...baseArgs,
	icon: false
};
