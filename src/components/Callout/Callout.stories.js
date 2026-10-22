import React, { useState } from 'react';
import typography from 'theme/typography';
import Callout from './Callout';

export default {
	title: 'Components/Callout',
	component: Callout,
	argTypes: {
		type: {
			control: 'select',
			options: ['info', 'warning', 'error']
		}
	}
};

// Callout leaves typography to the consumer; this mirrors the Figma "Body Medium" text style.
const textStyle = {
	fontFamily: typography.fontFamily,
	fontSize: typography.size.medium,
	fontWeight: 400,
	lineHeight: '18px'
};

const Template = (args) => (
	<Callout {...args}>
		<span style={textStyle}>{args.children}</span>
	</Callout>
);

const baseArgs = {
	children: 'Los productos pesables se cuentan por unidad, no por peso.'
};

export const Info = Template.bind({});
export const Warning = Template.bind({});
export const ErrorType = Template.bind({});

// Callout has no internal visibility state; the story owns it to show the close flow.
export const Closable = (args) => {
	const [visible, setVisible] = useState(true);

	return visible ? <Template {...args} onClose={() => setVisible(false)} /> : null;
};

Info.args = {
	...baseArgs,
	type: 'info'
};

Warning.args = {
	...baseArgs,
	type: 'warning'
};

ErrorType.args = {
	...baseArgs,
	type: 'error'
};

Closable.args = {
	...baseArgs,
	closeLabel: 'Cerrar'
};
