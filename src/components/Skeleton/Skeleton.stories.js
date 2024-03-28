import React from 'react';
import Skeleton from './Skeleton';

export default {
	title: 'Components/Skeleton',
	component: Skeleton,
	parameters: {
		layout: 'centered'
	}
};

const Template = (args) => (
	<div style={{ display: 'flex', gap: '3px' }}>
		<Skeleton {...args} />
	</div>
);

const baseArgs = {
	width: '100px',
	height: '100px'
};

export const Rounded = Template.bind({});
export const Square = Template.bind({});

Rounded.args = {
	circle: true,
	...baseArgs
};

Square.args = {
	...baseArgs,
	height: '20px'
};
