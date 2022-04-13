import React from 'react';
import Chip from 'components/Chip';
import { create } from 'react-test-renderer';

describe('Chip component', () => {
	test('render', () => {
		const wrapper = create(<Chip />);
		expect(wrapper.toJSON()).toBeTruthy();
	});

	test('Should render correctly diferents variants', () => {
		const wrapperOne = create(<Chip variant="contained" />);
		const wrapperTwo = create(<Chip variant="cleaned" />);
		const wrapperThree = create(<Chip variant="invalid-variant" />);

		expect(wrapperOne.toJSON()).toBeTruthy();
		expect(wrapperTwo.toJSON()).toBeTruthy();
		expect(wrapperThree.toJSON()).toBeTruthy();
	});
});
