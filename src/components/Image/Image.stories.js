import React from 'react';
import viewsPalette from 'theme/palette';
import Image from './Image';

const control = {
	type: 'select',
	options: Object.keys(viewsPalette).reduce((options, colorName) => {
		options[colorName] = viewsPalette[colorName];
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
