import React from 'react';
import Input from 'components/Input';

const getDOMInput = (wrapper) => wrapper.find('input').first().getDOMNode();

const inputSelector = 'input[type="text"]';

describe('Input component', () => {
	test('render', () => {
		const wrapper = shallow(<Input />);
		expect(wrapper.exists()).toBe(true);
	});

	test('should contains one text input', () => {
		const wrapper = mount(<Input />);
		expect(wrapper.find(inputSelector)).toHaveLength(1);
	});

	test('should contain one input fullWidth', () => {
		const wrapper = mount(<Input fullWidth />);
		expect(wrapper.find(inputSelector)).toHaveLength(1);
	});

	test('should contains one text input and icon', () => {
		const wrapper = mount(<Input icon="box" />);
		expect(wrapper.find(inputSelector)).toHaveLength(1);
		expect(wrapper.find('svg')).toHaveLength(1);
	});

	test('should contains one text input, icon and error text', () => {
		const wrapper = mount(<Input icon="box" errorMessage="errorMessage" error />);
		expect(wrapper.find(inputSelector)).toHaveLength(1);
		expect(wrapper.find('svg')).toHaveLength(1);
		expect(wrapper.find('span[data-test="errorMessage"]')).toHaveLength(1);
	});

	test('should be input with autocomplete off', () => {
		const wrapper = mount(<Input />);
		expect(getDOMInput(wrapper).autocomplete).toBe('off');
	});

	test('should be input with autocomplete password-off', () => {
		const wrapper = mount(<Input type="password" />);
		expect(getDOMInput(wrapper).autocomplete).toBe('new-password');
	});

	test('should be input with autocomplete on', () => {
		const wrapper = mount(<Input autoComplete />);
		expect(getDOMInput(wrapper).autocomplete).toBe('on');
	});

	test('should be input disabled', () => {
		const wrapper = mount(<Input disabled />);
		expect(getDOMInput(wrapper).disabled).toBeTruthy();
	});

	test('should be input disabled with label', () => {
		const wrapper = mount(<Input disabled />);
		expect(getDOMInput(wrapper).disabled).toBeTruthy();
	});

	test('should be input enabled', () => {
		const wrapper = mount(<Input disabled={false} />);
		expect(getDOMInput(wrapper).disabled).toBeFalsy();
	});

	test('should has name passed', () => {
		const wrapper = mount(<Input name="nameTest" />);
		expect(getDOMInput(wrapper).name).toBe('nameTest');
	});

	test('should has label passed', () => {
		const wrapper = mount(<Input label="labelText" />);
		expect(wrapper.find('div[data-test="floatingLabel"]').text()).toBe('labelText');
	});

	test('should call default events props without errors', () => {
		const wrapper = mount(<Input />);
		const input = wrapper.find(inputSelector);
		input.simulate('focus');
		input.simulate('change');
		input.simulate('blur');
	});

	test('should call onChange prop when triggered change event', () => {
		const onChangeFn = jest.fn();
		const wrapper = mount(<Input onChange={onChangeFn} />);
		wrapper.find(inputSelector).simulate('change');
		expect(onChangeFn).toHaveBeenCalledTimes(1);
	});

	test('should call onFocus prop when triggered focus event', () => {
		const onFocusFn = jest.fn();
		const wrapper = mount(<Input name="nameTest" onFocus={onFocusFn} />);
		wrapper.find(inputSelector).simulate('focus');
		expect(onFocusFn).toHaveBeenCalledTimes(1);
	});

	test('should call onBlur prop when triggered blur event', () => {
		const onBlurFn = jest.fn();
		const wrapper = mount(<Input name="nameTest" onBlur={onBlurFn} />);
		wrapper.find(inputSelector).simulate('blur');
		expect(onBlurFn).toHaveBeenCalledTimes(1);
	});

	describe('controlled', () => {
		test('should has value passed', () => {
			const wrapper = mount(<Input value="valueTest" onChange={() => null} />);
			expect(getDOMInput(wrapper).value).toBe('valueTest');
		});

		test('should update the value', () => {
			const wrapper = mount(<Input value="valueTest" onChange={() => null} />);
			wrapper.setProps({ value: 'otherValue' });
			expect(getDOMInput(wrapper).value).toBe('otherValue');
		});
	});

	describe('uncontrolled', () => {
		test('should has value passed', () => {
			const wrapper = mount(<Input defaultValue="valueTest" />);
			expect(getDOMInput(wrapper).value).toBe('valueTest');
		});
	});
});
