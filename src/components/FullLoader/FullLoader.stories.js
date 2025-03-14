import React from 'react';
import palette from 'theme/palette';
import FullLoader from './FullLoader';
import Icon from 'components/Icon';
import Spinner from 'components/Spinner';
import Link from 'components/Link';

const EFFECTS = {
	blur: {
		background:
			'linear-gradient(180deg, rgba(224, 238, 245, 0.5) 0%, rgba(221, 221, 221, 0.5) 100%)',
		backdropFilter: 'blur(7.5px)'
	},
	dark: {
		background: 'rgba(0, 0, 0, 0.7)',
		backdropFilter: 'none'
	},
	darkBlur: {
		background: 'rgba(0, 0, 0, 0.4)',
		backdropFilter: 'blur(10px)'
	},
	opaque: {
		background: 'rgba(255, 255, 255, 0.9)',
		backdropFilter: 'none'
	},
	glass: {
		background: 'rgba(255, 255, 255, 0.15)',
		backdropFilter: 'blur(10px)'
	}
};

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
		backgroundColor: { control },
		color: { control }
	}
};

const LinkText = (
	<Link>
		Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been
		the standard dummy text ever since the 1500s, when an unknown printer took a galley of type and
		scrambled it to make a type specimen book. It has survived not only five centuries, but also the
		leap into electronic typesetting, remaining essentially unchanged. It was popularised in the
		1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently
		with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.{' '}
	</Link>
);

const Template = (args) => (
	<>
		{LinkText}
		<FullLoader {...args} />
	</>
);

const TemplateWithChildren = (args) => (
	<>
		{LinkText}
		<FullLoader {...args}>
			<Spinner config={{ color: args.color, size: 115 }}>
				<Icon name="iso_janis" color={args.color || 'blue'} size={50} />
			</Spinner>
		</FullLoader>
	</>
);

const baseArgs = {};

export const None = Template.bind({});
export const Blur = TemplateWithChildren.bind({});
export const Dark = TemplateWithChildren.bind({});
export const DarkBlur = TemplateWithChildren.bind({});
export const Opaque = TemplateWithChildren.bind({});
export const Glass = TemplateWithChildren.bind({});

None.args = {
	...baseArgs
};

Blur.args = {
	effect: EFFECTS.blur
};

Dark.args = {
	effect: EFFECTS.dark
};

DarkBlur.args = {
	effect: EFFECTS.darkBlur
};

Opaque.args = {
	effect: EFFECTS.opaque
};

Glass.args = {
	effect: EFFECTS.glass
};
