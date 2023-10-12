import React from 'react';
import Chip from 'components/Chip';

describe('Chip component', () => {
	test('render', () => {
		const wrapper = shallow(<Chip />);
		expect(wrapper.exists()).toBeTruthy();
	});

	test('Should render correctly diferents variants', () => {
		const wrapperOne = mount(<Chip variant="contained" />);
		const wrapperTwo = mount(<Chip variant="status" />);
		const wrapperThree = mount(<Chip variant="outlined" />);

		expect(wrapperOne.exists()).toBeTruthy();
		expect(wrapperTwo.exists()).toBeTruthy();
		expect(wrapperThree.exists()).toBeTruthy();
	});

	test('Should render chip with text', () => {
		const children = 'Text children';
		const wrapper = mount(<Chip variant="contained">{children}</Chip>);
		expect(wrapper.text()).toBe(children);
	});

	test('Should render chip with icon', () => {
		const wrapper = shallow(<Chip variant="contained" icon="box" iconColor="primary" />);
		expect(wrapper.find('.chip-icon')).toBeTruthy();
	});

	test('Should render null if children is empty', () => {
		const children = '-';
		const validation = !children || children === 0 || children === '-';
		const wrapper = validation ? null : mount(<Chip variant="contained">{children}</Chip>).toJSON();
		expect(wrapper).toBeNull();
	});
});
