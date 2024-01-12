import React from 'react';
import Colors from './Colors';

export default {
	title: 'Theme/Colors',
	component: Colors
};

const Template = (args) => <Colors {...args} />;

export const ColorList = Template.bind({});
