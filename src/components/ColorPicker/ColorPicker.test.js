import React from 'react';
import ColorPicker from 'components/ColorPicker';

describe('ColorPicker component', () => {
	const getPicker = (wrapper) => {
		return wrapper.find('[data-test="simple-picker"]').at(0);
	};

	test('Should render correctly simple picker', () => {
		const wrapper = shallow(<ColorPicker />);
		const picker = getPicker(wrapper);
		expect(picker.exists()).toBe(true);
	});

	test('Should render correctly collapsible picker', () => {
		const wrapper = mount(<ColorPicker isCollapsable />);
		const picker = getPicker(wrapper);
		const collapsiblePicker = wrapper.find('[data-test="collapsible-picker"]').at(0);
		expect(picker.exists()).toBe(false);
		expect(collapsiblePicker.exists()).toBe(true);
	});

	test('Should render correctly with color prop passed (simple picker)', () => {
		const wrapper = mount(<ColorPicker color="#000" />);
		const picker = getPicker(wrapper);
		expect(picker.props().color).toBe('#000');
	});

	test('Should render correctly with color prop passed (collapsible picker)', () => {
		const wrapper = mount(<ColorPicker isCollapsable color="#000" />);
		const collapsiblePicker = wrapper.find('[data-test="collapsible-picker"]').at(0);
		expect(collapsiblePicker.props().color).toBe('#000');
	});

	test('Should color changed when call onChange', () => {
		const wrapper = mount(<ColorPicker isCollapsable error />);
		const collapsiblePicker = wrapper.find('[data-test="collapsible-picker"]').at(0);

		collapsiblePicker.simulate('click');

		wrapper.update();

		wrapper
			.find('input')
			.at(0)
			.simulate('change', { target: { value: '' } });

		wrapper.update();

		wrapper
			.find('input')
			.at(0)
			.simulate('change', { target: { value: '#000000' } });

		wrapper.update();

		expect(wrapper.find('[data-test="collapsible-picker"]').at(0).props().color).toBe('#000000');
	});
});
