import React from 'react';
import 'jest-styled-components';
import Image from 'components/Image';

describe('Image component', () => {
	test('should render content', () => {
		const wrapper = mount(<Image url="https://i.imgur.com/mvMjwsH.png" />);
		expect(wrapper.children().exists()).toBe(true);
	});

	test('should render an image element', () => {
		const wrapper = mount(<Image url="https://i.imgur.com/mvMjwsH.png" />);
		expect(wrapper.find('img').exists()).toBe(true);
	});

	test('should render an icon if no url is provided', () => {
		const wrapper = mount(<Image />);
		expect(wrapper.find('svg').exists()).toBe(true);
	});

	test('should render errorImage if fail image load', () => {
		const wrapper = mount(<Image url="https://i.imgur.com/mvMjwsH.png" roundBorders />);
		wrapper.find('img').at(0).simulate('error');
		expect(wrapper.find('img').exists()).toBe(false);
	});

	test('image should get an alternative text, either provided as such or use the provided url', () => {
		const wrapper = mount(<Image url="https://i.imgur.com/mvMjwsH.png" altText="fizz logo" />);

		const { url, altText } = wrapper.props();
		const possibleAltTexts = new RegExp(`${altText}|${url}`);

		expect(wrapper.find('img').props().alt).toMatch(possibleAltTexts);
	});

	test('wrapper should get an automatic width and height if none is provided', () => {
		const wrapper = mount(<Image url="https://i.imgur.com/mvMjwsH.png" />);
		expect(wrapper).toHaveStyleRule('width', 'auto');
	});

	test('width/height should be a number or undefined', () => {
		const wrapper = mount(<Image url="https://i.imgur.com/mvMjwsH.png" width={200} height={20} />);
		expect(typeof wrapper.props().width).toMatch(/number|undefined/);
		expect(typeof wrapper.props().height).toMatch(/number|undefined/);
	});

	test('wrapper should match the defined width', () => {
		const width = 200;
		const wrapper = mount(<Image url="https://i.imgur.com/mvMjwsH.png" width={width} />);
		expect(wrapper).toHaveStyleRule('width', `${width}px`);
	});

	test('wrapper should match the defined width and height', () => {
		const width = 200;
		const height = 250;
		const wrapper = mount(
			<Image url="https://i.imgur.com/mvMjwsH.png" width={width} height={height} />
		);
		expect(wrapper).toHaveStyleRule('width', `${width}px`);
		expect(wrapper).toHaveStyleRule('height', `${height}px`);
	});

	test('wrapper should get rounded borders', () => {
		const wrapper = mount(<Image url="https://i.imgur.com/mvMjwsH.png" roundBorders />);
		expect(wrapper).toHaveStyleRule('border-radius', '50%');
	});

	test('wrapper should get rounded borders with pixels', () => {
		const wrapper = mount(<Image url="https://i.imgur.com/mvMjwsH.png" roundBorders={10} />);
		expect(wrapper).toHaveStyleRule('border-radius', '10px');
	});
});
