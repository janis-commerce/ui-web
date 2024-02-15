import React from 'react';
import Colors from './Colors';

export default {
	title: 'Theme/Colors',
	component: Colors,
	parameters: {
		layout: 'centered'
	}
};

const Template = () => <Colors />;

export const Base = Template.bind({});
