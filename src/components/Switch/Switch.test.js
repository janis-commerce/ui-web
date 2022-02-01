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
			expect(statusColor({ checked: false, disabled: true })).toEqual(palette.grey.main);
			expect(statusColor({ checked: false, disabled: false })).toEqual(palette.darkGrey);
		});
	});
});
