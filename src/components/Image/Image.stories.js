import React from 'react';
import palette from 'theme/palette';
import Image from './Image';

const control = {
	type: 'select',
	options: Object.keys(palette).reduce((options, colorName) => {
		options[colorName] = palette[colorName];
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
	url: 'https://cdn.id.janis.in/client-images/5ec2d43b70cd6700077c3aa1/964e3f17-17fd-4fa1-856f-79c5345176ae.png',
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
