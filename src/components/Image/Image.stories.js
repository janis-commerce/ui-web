import React from 'react';
import Image from './Image';
import { validColors } from 'components/Button/utils';

const control = {
	type: 'select',
	options: validColors.reduce((options, color) => {
		options[color] = color;
		return options;
	}, {})
};

export default {
	title: 'Components/Image',
	component: Image,
	parameters: {
		layout: 'centered'
	},
	argTypes: {
		background: control
	}
};

const Template = (args) => <Image {...args} />;

const baseArgs = {
	url: 'https://app.janis.in/static/media/janis-logo-base.0cc15e53.svg',
	width: 100,
	height: 100,
	altText: 'Que',
	roundBorders: false,
	background: 'red'
};

export const Base = Template.bind({});

Base.args = {
	...baseArgs
};
