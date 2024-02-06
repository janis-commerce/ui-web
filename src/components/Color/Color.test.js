import React from 'react';
import Color from 'components/Color';
import { create } from 'react-test-renderer';
import { findColorInPalette } from 'theme/utils';
import 'jest-styled-components';

describe('Color component', () => {
	test('must receive a color name/code', () => {
		const wrapper = create(<Color color="black" />);
		expect(wrapper.root.props).toBeDefined();
	});

	test("should render nothing if a color wasn't provided", () => {
		const wrapper = create(<Color />);
		expect(wrapper.toJSON()).toBeNull();
	});

	test('should render the proper hex code label if showLabel is truthy', () => {
		const color = 'statusRed';

		const wrapper = create(<Color color={color} showLabel />);

		const childrens = wrapper.toJSON().children;

		const hexaLabel = childrens[1].children[0];

		expect(hexaLabel).toBe('#FF4343');
	});

	test('should contain a div to represent a color sample', () => {
		const wrapper = mount(<Color color="#ffbb00" />);
		const sample = wrapper.find('div');
		expect(sample.exists()).toBe(true);
	});

	test("must apply provided color as the inner div's background", () => {
		const color = 'statusRed';
		const wrapper = mount(<Color color={color} />);
		const sample = wrapper.find('div').last();
		expect(sample).toHaveStyleRule('background-color', findColorInPalette(color));
	});

	test('should not render text if showLabel is false or undefined', () => {
		const color = 'statusRed';
		const wrapper = mount(<Color color={color} />);
		expect(wrapper.find('span').exists()).toBe(false);
	});

	test('should render the proper hex code label if showLabel is truthy', () => {
		const color = 'statusRed';
		const wrapper = mount(<Color color={color} showLabel />);
		expect(wrapper.getDOMNode().textContent).toBe(findColorInPalette(color));
	});
});
