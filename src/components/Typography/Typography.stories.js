import React from 'react';
import palette from 'theme/palette';
import Typography from './Typography';

export default {
	title: 'Components/Typography',
	component: Typography,
	parameters: {
		layout: 'centered'
	},
	argTypes: {
		type: {
			table: { disable: true }
		},
		size: {
			control: {
				type: 'select'
			},
			options: ['small', 'medium', 'large']
		},
		color: {
			control: {
				type: 'select'
			},
			options: Object.keys(palette)
		}
	}
};

const Template = (args) => <Typography {...args}>Janis commerce</Typography>;

export const Display = Template.bind({});
export const Heading = Template.bind({});
export const Title = Template.bind({});
export const Label = Template.bind({});
export const Body = Template.bind({});
export const Overline = Template.bind({});

Display.args = {
	type: 'display',
	size: 'large'
};

Heading.args = {
	type: 'heading'
};

Title.args = {
	type: 'title'
};

Label.args = {
	type: 'label'
};

Body.args = {
	type: 'body'
};

Overline.args = {
	type: 'overline'
};
