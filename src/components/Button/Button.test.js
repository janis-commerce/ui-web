import React from 'react';
import Button from 'components/Button';
import Icon from 'components/Icon';
import { getColor, getHoverColor, getPressedColor } from './utils';
import { create } from 'react-test-renderer';
import viewsPalette from 'theme/palette';

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
				<Button icon="box" color="blue" iconColor="white" fontColor="white">
					{children}
				</Button>
			);
			const wrapperTwo = create(<Button icon="box" color="blue" iconColor="white" rounded />);
			const wrapperThree = create(<Button disabled>{children}</Button>);

			expect(wrapperOne.toJSON()).toBeTruthy();
			expect(wrapperTwo.toJSON()).toBeTruthy();
			expect(wrapperThree.toJSON()).toBeTruthy();
		});
	});

	describe('Utils', () => {
		const exampleColors = [
			{
				color: 'blue',
				valueColor: viewsPalette.blue,
				valueHover: viewsPalette.blueHover,
				valuePressed: viewsPalette.bluePressed
			},
			{
				color: 'black',
				valueColor: viewsPalette.black,
				valueHover: viewsPalette.blackHover,
				valuePressed: viewsPalette.blackPressed
			},
			{
				color: 'grey',
				valueColor: viewsPalette.grey,
				valueHover: viewsPalette.greyHover,
				valuePressed: viewsPalette.greyPressed
			}
		];

		const exampleInvalidColors = ['transparentWhite'];

		test('Should returns default colors', () => {
			exampleInvalidColors.forEach((color) => {
				expect(getColor(color)).toEqual(viewsPalette.blue);
				expect(getHoverColor(color)).toEqual(viewsPalette.blueHover);
				expect(getPressedColor(color)).toEqual(viewsPalette.bluePressed);
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
