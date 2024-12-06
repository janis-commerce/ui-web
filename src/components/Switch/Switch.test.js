import React from 'react';
import Switch from 'components/Switch';
import { create } from 'react-test-renderer';
import Icon from 'components/Icon';
import palette from 'theme/palette';
import { statusColor } from './styles';

describe('Switch component', () => {
	describe('Component', () => {
		test('Should render correctly', () => {
			const wrapper = create(<Switch />);
			expect(wrapper.toJSON()).toBeTruthy();
		});

		test('Should mount and change correctly', () => {
			const wrapper = mount(<Switch />);
			wrapper.find('input').simulate('change');
			expect(wrapper.exists()).toBeTruthy();
		});

		test('Should contains checkbox input', () => {
			const wrapper = create(<Switch />);

			expect(wrapper.toJSON()).toBeTruthy();
			expect(wrapper.root.findByType('input')).toBeTruthy();
		});

		test('Should contains a Icon', () => {
			const wrapper = create(<Switch />);

			expect(wrapper.toJSON()).toBeTruthy();
			expect(wrapper.root.findByType(Icon)).toBeTruthy();
		});

		test('Should default not checked', () => {
			const wrapper = create(<Switch />);

			const { props } = wrapper.toJSON();
			expect(props.checked).toBeFalsy();
		});

		test('Should set prop autocomplete off', () => {
			const wrapper = create(<Switch />);
			const input = wrapper.root.findByType('input');
			expect(input.props.autoComplete).toBe('off');
		});

		test('Should set prop autocomplete on', () => {
			const wrapper = create(<Switch autoComplete />);
			const input = wrapper.root.findByType('input');
			expect(input.props.autoComplete).toBe('on');
		});

		test('should call onChange prop when triggered change event', () => {
			const onChangeFn = jest.fn();
			const wrapper = mount(<Switch name="test" onChange={onChangeFn} />);
			wrapper.find('input').simulate('change');
			expect(onChangeFn).toHaveBeenCalledTimes(1);
		});

		describe('controlled', () => {
			test('Should not be checked when value is false', () => {
				const wrapper = create(<Switch checked={false} onChange={() => null} />);

				const { props } = wrapper.toJSON();
				expect(props.checked).toBeFalsy();
			});
		});

		describe('uncontrolled', () => {
			test('Should not be checked  when defaultChecked is false', () => {
				const wrapper = create(<Switch defaultChecked={false} />);

				const { props } = wrapper.toJSON();
				expect(props.checked).toBeFalsy();
			});

			test('Should be checked  when defaultChecked is true', () => {
				const wrapper = create(<Switch defaultChecked />);

				const { props } = wrapper.toJSON();
				expect(props.checked).toBeTruthy();
			});
		});
	});
	describe('utils', () => {
		test('statusColor function Should returns correct colors', () => {
			expect(statusColor({ checked: true, disabled: true })).toEqual(palette.blueDisabled);
			expect(statusColor({ checked: true, disabled: false })).toEqual(palette.blue);
			expect(statusColor({ checked: false, disabled: true })).toEqual(palette.grey);
			expect(statusColor({ checked: false, disabled: false })).toEqual(palette.darkGrey);
		});
	});
});
