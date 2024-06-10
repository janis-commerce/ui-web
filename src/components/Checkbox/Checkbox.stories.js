import React from 'react';
import Checkbox from './Checkbox';
import { DocComponent } from 'docs/DocComponent';

export default {
	title: 'Components/Checkbox',
	component: Checkbox,
	parameters: {
		layout: 'centered',
		docs: {
			page: () => (
				<DocComponent
					title="Checkbox"
					description="Checkbox es un componente que permite al usuario seleccionar o deseleccionar una opción."
					argsTableOf={Checkbox}
				></DocComponent>
			)
		}
	}
};

const Template = (args) => <Checkbox {...args} />;

const baseArgs = {
	autoComplete: false,
	disabled: false,
	defaultChecked: true,
	rounded: false,
	value: 6
};

export const Base = Template.bind({});

Base.args = {
	...baseArgs
};
