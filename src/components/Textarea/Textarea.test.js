import React from 'react';
import Textarea from 'components/Textarea';

const getDOMInput = (wrapper) => wrapper.find('textarea').first().getDOMNode();

describe('Textarea component', () => {
	test('render', () => {
		const wrapper = shallow(<Textarea />);
		expect(wrapper.exists()).toBe(true);
	});

	test('should contain one textarea', () => {
		const wrapper = mount(<Textarea />);
		expect(wrapper.find('textarea')).toHaveLength(1);
	});

	test('should be disabled', () => {
		const wrapper = mount(<Textarea disabled />);
		expect(getDOMInput(wrapper).disabled).toBeTruthy();
	});

	test('should be enabled', () => {
		const wrapper = mount(<Textarea disabled={false} />);
		expect(getDOMInput(wrapper).disabled).toBeFalsy();
	});

	test('should have name passed', () => {
		const wrapper = mount(<Textarea name="nameTest" />);
		expect(getDOMInput(wrapper).name).toBe('nameTest');
	});

	test('should call onChange prop when triggered change event', () => {
		const onChangeFn = jest.fn();
		const wrapper = mount(<Textarea onChange={onChangeFn} />);
		wrapper.find('textarea').simulate('change');
		expect(onChangeFn).toHaveBeenCalledTimes(1);
	});

	test('should call onFocus prop when triggered focus event', () => {
		const onFocusFn = jest.fn();
		const wrapper = mount(<Textarea name="nameTest" onFocus={onFocusFn} />);
		wrapper.find('textarea').simulate('focus');
		expect(onFocusFn).toHaveBeenCalledTimes(1);
	});

	test('should call onBlur prop when triggered blur event', () => {
		const onBlurFn = jest.fn();
		const wrapper = mount(<Textarea name="nameTest" onBlur={onBlurFn} />);
		wrapper.find('textarea').simulate('blur');
		expect(onBlurFn).toHaveBeenCalledTimes(1);
	});

	describe('controlled', () => {
		test('should have value passed', () => {
			const wrapper = mount(<Textarea value="valueTest" onChange={() => null} />);
			expect(getDOMInput(wrapper).value).toBe('valueTest');
		});

		test('should update the value', () => {
			const wrapper = mount(<Textarea value="valueTest" onChange={() => null} />);
			wrapper.setProps({ value: 'otherValue' });
			expect(getDOMInput(wrapper).value).toBe('otherValue');
		});
	});

	describe('uncontrolled', () => {
		test('should have value passed', () => {
			const wrapper = mount(<Textarea defaultValue="valueTest" />);
			expect(getDOMInput(wrapper).value).toBe('valueTest');
		});
	});
});
