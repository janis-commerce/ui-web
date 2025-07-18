import React from 'react';
import palette from 'theme/palette';
import Spinner from './Spinner';
import JanisGif from 'images/janis-loader.gif';

const control = {
	type: 'select',
	options: Object.keys(palette).reduce((options, colorName) => {
		options[colorName] = palette[colorName];
		return options;
	}, {})
};

export default {
	title: 'Components/Spinner',
	component: Spinner,
	parameters: {
		layout: 'centered'
	},
	argTypes: {
		config: {
			color: { control }
		}
	}
};

const Template = (args) => <Spinner {...args} />;
const TemplateWithIcon = (args) => (
	<Spinner {...args}>
		<img src={JanisGif} alt="Loading..." width={50} />{' '}
	</Spinner>
);

const baseArgs = {
	config: {
		color: 'blue',
		duration: 1,
		thickness: 3,
		backSpinnerColor: 'rgba(169, 161, 161, 0.15)'
	}
};

export const Basic = Template.bind({});
export const WithIcon = TemplateWithIcon.bind({});

Basic.args = {
	...baseArgs
};

WithIcon.args = {
	...baseArgs
};
