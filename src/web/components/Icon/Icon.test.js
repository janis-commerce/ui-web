import React from 'react';
import Icon from 'web/components/Icon';
import { create } from 'react-test-renderer';

describe('Icon component', () => {
	test('Should render correctly', () => {
		const wrapper = create(<Icon name="eye" />);
		expect(wrapper.exists()).toBe(true);
	});

	test('Should be null when an incorrect name is passed', () => {
		const wrapper = create(<Icon name="saraza" />);
		expect(wrapper.exists()).toBe(false);
	});
});
