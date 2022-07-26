import React from 'react';
import { getHeight } from './utils';
import HTML from 'components/HTML';

describe('HTML component', () => {
	test('Should return null if not pass code or sourceUrl', () => {
		const wrapper = shallow(<HTML />);
		expect(wrapper.isEmptyRender()).toBeTruthy();
	});

	test('Should render iframe if pass a sourceUrl', () => {
		const wrapper = mount(<HTML sourceURL="https://github.com/" />);

		expect(wrapper.find('iframe').props().src).toBe('https://github.com/');
		expect(wrapper.exists('iframe')).toBeTruthy();
	});

	test('Should render iframe if pass a code', () => {
		const code = '<p>Some Text<p/>';
		const wrapper = mount(<HTML code={code} />);

		expect(wrapper.find('iframe').props().srcDoc).toBe(code);
		expect(wrapper.exists('iframe')).toBeTruthy();
	});
});

describe('Test utils', () => {
	describe('Test for getHeight fn', () => {
		test('Should return measure depending on the string value provided', () => {
			global.window.innerHeight = 950;

			expect(getHeight('large')).toBe(600);
			expect(getHeight('full')).toBe(700);
			expect(getHeight('medium')).toBe(400);
		});

		test('Should return a measure equal to the numeric value provided', () => {
			expect(getHeight(750)).toBe(750);
		});

		test('Should return the default measure if it doesnt have a given value', () => {
			expect(getHeight()).toBe(400);
			expect(getHeight(null)).toBe(400);
			expect(getHeight('')).toBe(400);
			expect(getHeight(0)).toBe(400);
		});

		test('Should return a measure if pass others truthy typos', () => {
			expect(getHeight([])).toBe(400);
			expect(getHeight({})).toBe(400);
		});
	});
});
