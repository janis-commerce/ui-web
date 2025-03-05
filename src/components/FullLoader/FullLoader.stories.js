import React from 'react';
import palette from 'theme/palette';
import FullLoader from './FullLoader';
import Icon from 'components/Icon';
import Spinner from 'components/Spinner';

const control = {
	type: 'select',
	options: Object.keys(palette).reduce((options, colorName) => {
		options[colorName] = palette[colorName];
		return options;
	}, {})
};

export default {
	title: 'Components/FullLoader',
	component: FullLoader,
	parameters: {
		layout: 'centered'
	},
	argTypes: {
		color: { control }
	}
};

const Template = (args) => <FullLoader {...args} />;
const TemplateWithChildren = (args) => (
	<FullLoader {...args}>
		<Spinner config={{ color: args.color }}>
			<Icon name="trash" color={args.color} size={50} />
		</Spinner>
	</FullLoader>
);

const baseArgs = {
	spinnerConfig: { color: 'red' },
	effect: { backdropFilter: 'blur(5px)' }
};

export const Blur = Template.bind({});
export const WithChildren = TemplateWithChildren.bind({});

Blur.args = {
	...baseArgs
};

WithChildren.args = {
	color: 'green'
};
