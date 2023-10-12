import React from 'react';
import Button from 'components/Button';
import Icon from 'components/Icon';
import palette from 'theme/palette';
import { getColor, getHoverColor, getPressedColor } from './utils';
import { create } from 'react-test-renderer';

describe('Button component', () => {
	describe('Component', () => {
		test('Should render correctly', () => {
			const wrapper = create(<Button />);
			expect(wrapper.toJSON()).toBeTruthy();
		});

		test('Should render correctly diferents variants', () => {
			const wrapperOne = create(<Button variant="contained" />);
			const wrapperTwo = create(<Button variant="cleaned" />);
			const wrapperThree = create(<Button variant="outlined" />);

			expect(wrapperOne.toJSON()).toBeTruthy();
			expect(wrapperTwo.toJSON()).toBeTruthy();
			expect(wrapperThree.toJSON()).toBeTruthy();
		});

		test('Should render correctly with children', () => {
			const children = 'SomeText';
			const wrapper = create(<Button>{children}</Button>);

			expect(wrapper.toJSON()).toBeTruthy();
			expect(wrapper.toJSON().children).toEqual([children]);
		});

		test('Should render correctly with icon', () => {
			const wrapper = create(<Button icon="box" />);

			expect(wrapper.toJSON()).toBeTruthy();
			expect(wrapper.root.findByType(Icon)).toBeTruthy();
		});

		test('Should render correctly diferents buttons', () => {
			const children = 'SomeText';
			const wrapperOne = create(
				<Button icon="box" color="primary" iconColor="white" fontColor="white">
					{children}
				</Button>
			);
			const wrapperTwo = create(<Button icon="box" color="primary" iconColor="white" rounded />);
			const wrapperThree = create(<Button disabled>{children}</Button>);

			expect(wrapperOne.toJSON()).toBeTruthy();
			expect(wrapperTwo.toJSON()).toBeTruthy();
			expect(wrapperThree.toJSON()).toBeTruthy();
		});
	});

	describe('Utils', () => {
		const exampleColors = [
			{
				color: 'primary',
				valueColor: palette.primary.main,
				valueHover: palette.primary.hover,
				valuePressed: palette.primary.pressed
			},
			{
				color: 'blue',
				valueColor: palette.blue,
				valueHover: palette.blueHover,
				valuePressed: palette.bluePressed
			},
			{
				color: 'grey.dark',
				valueColor: palette.grey.dark,
				valueHover: palette.grey.darkHover,
				valuePressed: palette.grey.darkPressed
			}
		];

		const exampleInvalidColors = ['base.white', 'transparentWhite'];

		test('Should returns default colors', () => {
			exampleInvalidColors.forEach((color) => {
				expect(getColor(color)).toEqual(palette.blue);
				expect(getHoverColor(color)).toEqual(palette.blueHover);
				expect(getPressedColor(color)).toEqual(palette.bluePressed);
			});
		});

		test('Should returns correct colors', () => {
			exampleColors.forEach(({ color, valueColor, valueHover, valuePressed }) => {
				expect(getColor(color)).toEqual(valueColor);
				expect(getHoverColor(color)).toEqual(valueHover);
				expect(getPressedColor(color)).toEqual(valuePressed);
			});
		});
	});
});
