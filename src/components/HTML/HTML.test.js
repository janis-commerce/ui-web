import { getHeight } from './utils';

describe('Test utils HTML.js', () => {
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
