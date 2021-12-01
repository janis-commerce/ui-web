import React from 'react';
import Icon from 'components/Icon';
import { create } from 'react-test-renderer';

const jsonMock = {
	box: { path: 'M 10 10 H 90 V 90 H 10 L 10 10', size: 24 },
	fakeIcon: {}
};

jest.mock('./icons.json', () => jsonMock);

describe('Icon component', () => {
	test('Should render correctly', () => {
		const wrapper = create(<Icon name="box" />);
		expect(wrapper.toJSON()).toBeTruthy();
	});

	test('Should be null when an incorrect name is passed', () => {
		const wrapper = create(<Icon name="saraza" />);
		expect(wrapper.toJSON()).toBeNull();
	});

	test('Should be null when the icon has no path.', () => {
		const wrapper = create(<Icon name="fakeIcon" />);
		expect(wrapper.toJSON()).toBeNull();
	});
});
