import React from 'react';
import QRCode from './QRCode';

export default {
	title: 'Components/QRCode',
	component: QRCode,
	parameters: {
		layout: 'centered'
	}
};

const Template = (args) => <QRCode {...args} />;

const baseArgs = {
	value: 'https://app.janisdev.in/',
	size: 200
};

export const Base = Template.bind({});

Base.args = {
	...baseArgs
};
