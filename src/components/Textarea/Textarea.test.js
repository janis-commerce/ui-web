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

	test('should contain one textarea fullWidth', () => {
		const wrapper = mount(<Textarea fullWidth />);
		expect(wrapper.find('textarea')).toHaveLength(1);
	});

	test('should contains one textarea and error text', () => {
		const wrapper = mount(<Textarea errorMessage="errorMessage" error />);
		expect(wrapper.find('textarea')).toHaveLength(1);
		expect(wrapper.find('span[data-test="errorMessage"]')).toHaveLength(1);
	});

	test('should be textarea with autocomplete off', () => {
		const wrapper = mount(<Textarea />);
		expect(getDOMInput(wrapper).autocomplete).toBe('off');
	});

	test('should be textarea with autocomplete on', () => {
		const wrapper = mount(<Textarea autoComplete />);
		expect(getDOMInput(wrapper).autocomplete).toBe('on');
	});

	test('should be disabled', () => {
		const wrapper = mount(<Textarea disabled />);
		expect(getDOMInput(wrapper).disabled).toBeTruthy();
	});

	test('should be enabled', () => {
		const wrapper = mount(<Textarea disabled={false} />);
		expect(getDOMInput(wrapper).disabled).toBeFalsy();
	});

	test('should contain label using hasFloatingLabel', () => {
		const wrapper = mount(<Textarea label="labelText" hasFloatingLabel />);
		expect(wrapper.find('div[data-test="floatingLabel"]').text()).toBe('labelText');
	});

	test('should have name passed', () => {
		const wrapper = mount(<Textarea name="nameTest" />);
		expect(getDOMInput(wrapper).name).toBe('nameTest');
	});

	test('should call default events props without errors', () => {
		const wrapper = mount(<Textarea />);
		const textArea = wrapper.find('textarea');
		textArea.simulate('focus');
		textArea.simulate('change');
		textArea.simulate('blur');
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

	test('should call onFocus prop when triggered focus event (with FloatingLabel)', () => {
		const onFocusFn = jest.fn();
		const wrapper = mount(
			<Textarea name="nameTest" label="label" hasFloatingLabel onFocus={onFocusFn} />
		);
		wrapper.find('textarea').simulate('focus');
		expect(onFocusFn).toHaveBeenCalledTimes(1);
	});

	test('should call onBlur prop when triggered blur event', () => {
		const onBlurFn = jest.fn();
		const wrapper = mount(<Textarea name="nameTest" onBlur={onBlurFn} />);
		wrapper.find('textarea').simulate('blur');
		expect(onBlurFn).toHaveBeenCalledTimes(1);
	});

	test('should call onBlur prop when triggered blur event (with FloatingLabel)', () => {
		const onBlurFn = jest.fn();
		const wrapper = mount(
			<Textarea name="nameTest" label="label" hasFloatingLabel onBlur={onBlurFn} />
		);
		wrapper.find('textarea').simulate('blur');
		expect(onBlurFn).toHaveBeenCalledTimes(1);
	});

	test('should call onInput', () => {
		const wrapper = mount(<Textarea name="nameTest" />);
		wrapper.find('textarea').simulate('input');
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

		test('should update the value (with floatingLabel)', () => {
			const wrapper = mount(
				<Textarea value="valueTest" label="label" hasFloatingLabel onChange={() => null} />
			);
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
