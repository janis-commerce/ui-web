import React from 'react';
import palette from 'theme/palette';
import Avatar from './Avatar';
import AvatarDocs from './AvatarDocs';
import { DocComponent } from 'docs/DocComponent';

const control = {
	type: 'select',
	options: Object.keys(palette).reduce((options, colorName) => {
		options[colorName] = palette[colorName];
		return options;
	}, {})
};

export default {
	title: 'Components/Avatar',
	component: Avatar,
	parameters: {
		layout: 'centered',
		docs: {
			page: () => (
				<DocComponent
					title="Avatar"
					description="Pequeña imagen o icono que representa a un usuario dentro de una interfaz digital. Los avatares añaden un toque personal y ayudan a reconocer rápidamente al usuario."
					argsTableOf={Avatar}
				>
					<AvatarDocs />
				</DocComponent>
			)
		}
	},
	argTypes: {
		mainColor: { control },
		size: {
			type: 'select',
			options: ['small', 'medium', 'large', 'extralarge', 'auto']
		}
	}
};

const Template = (args) => <Avatar {...args} />;

const baseArgs = {
	rounded: true,
	size: 'large'
};

export const WithURL = Template.bind({});
export const Default = Template.bind({});
export const WithName = Template.bind({});

WithURL.args = {
	...baseArgs,
	url: 'https://cdn.id.janis.in/client-images/5ec2d43b70cd6700077c3aa1/0cdc0141-1f76-465a-8a06-8512b289eb85.png'
};

Default.args = {
	...baseArgs
};

WithName.args = {
	...baseArgs,
	firstname: 'Esteban',
	lastname: 'Quito'
};
