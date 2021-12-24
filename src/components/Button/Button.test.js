import React from 'react';
import Button from 'components/Button';
import { create } from 'react-test-renderer';

describe('Button component', () => {
	test('Should render correctly', () => {
		const wrapper = create(<Button />);
		expect(wrapper).toBeDefined();
	});
	// test('Should render correctly', () => {
	// 	const mockFunction = jest.fn();

	// 	const wrapper = create(<Button />).root;

	// 	console.log({ wrapper });

	// 	wrapper.findByType('button').simulate('click');
	// 	expect(mockFunction).toHaveBeenCalled();
	// });
});
