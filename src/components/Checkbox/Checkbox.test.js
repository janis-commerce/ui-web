import React from 'react';
import Checkbox from 'components/Checkbox';
import { create } from 'react-test-renderer';
import Icon from 'components/Icon';

describe('Checkbox component', () => {
	describe('Component', () => {
		test('Should render correctly', () => {
			const wrapper = create(<Checkbox />);
			expect(wrapper.toJSON()).toBeTruthy();
		});

		test('Should mount and change correctly', () => {
			const wrapper = mount(<Checkbox />);
			wrapper.find('input').simulate('change');
			expect(wrapper.exists()).toBeTruthy();
		});

		test('Should contains checkbox input', () => {
			const wrapper = create(<Checkbox />);

			expect(wrapper.toJSON()).toBeTruthy();
			expect(wrapper.root.findByType('input')).toBeTruthy();
		});

		test('Should contains a Icon', () => {
			const wrapper = create(<Checkbox />);

			expect(wrapper.toJSON()).toBeTruthy();
			expect(wrapper.root.findByType(Icon)).toBeTruthy();
		});

		test('Should default not checked', () => {
			const wrapper = create(<Checkbox />);

			const { props } = wrapper.toJSON();
			expect(props.checked).toBeFalsy();
		});

		test('Should set prop autocomplete off', () => {
			const wrapper = create(<Checkbox />);
			const input = wrapper.root.findByType('input');
			expect(input.props.autoComplete).toBe('off');
		});

		test('Should set prop autocomplete on', () => {
			const wrapper = create(<Checkbox autoComplete />);
			const input = wrapper.root.findByType('input');
			expect(input.props.autoComplete).toBe('on');
		});

		test('Should call onChange prop when triggered change event', () => {
			const onChangeFn = jest.fn();
			const wrapper = mount(<Checkbox name="test" onChange={onChangeFn} />);
			wrapper.find('input').simulate('change');
			expect(onChangeFn).toHaveBeenCalledTimes(1);
		});

		describe('controlled', () => {
			test('Should not be checked when value is false', () => {
				const wrapper = create(<Checkbox checked={false} onChange={() => null} />);

				const { props } = wrapper.toJSON();
				expect(props.checked).toBeFalsy();
			});

			test('Should be checked  when value is true', () => {
				const wrapper = create(<Checkbox checked />);

				const { props } = wrapper.toJSON();
				expect(props.checked).toBeTruthy();
			});
		});

		describe('uncontrolled', () => {
			test('Should not be checked  when defaultChecked is false', () => {
				const wrapper = create(<Checkbox defaultChecked={false} />);

				const { props } = wrapper.toJSON();
				expect(props.checked).toBeFalsy();
			});
			test('Should be checked  when defaultChecked is true', () => {
				const wrapper = create(<Checkbox defaultChecked />);

				const { props } = wrapper.toJSON();
				expect(props.checked).toBeTruthy();
			});
		});
	});
});
