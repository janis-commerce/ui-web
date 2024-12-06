import React from 'react';
import QRCode from 'components/QRCode';

describe('QRCode component', () => {
	test('should error if not pass required prop', () => {
		const wrapper = mount(<QRCode />);
		expect(wrapper.isEmptyRender()).toBeTruthy();
	});

	test('should mount correctly if pass required prop', () => {
		const wrapper = mount(<QRCode value="someString" />);
		expect(wrapper).toBeTruthy();
	});

	test('should have correctly props', () => {
		const wrapper = shallow(<QRCode value="someString" />);

		expect(wrapper.props().value).toBe('someString');
		expect(wrapper.props().size).toBe(100);
	});

	test('should change props correctly', () => {
		const wrapper = shallow(<QRCode value="someString" />);

		wrapper.setProps({ value: 'otherString', size: 150 });

		expect(wrapper.props().value).toBe('otherString');
		expect(wrapper.props().size).toBe(150);
	});
});
