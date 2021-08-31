import { getColor } from './utils';

describe('theme functions', () => {
	describe('function getColor', () => {
		test('return a default color', () => {
			expect(getColor()).toBe('#2979FF');
		});
		test('return a main color', () => {
			expect(getColor('white')).toBe('#E8EAF6');
		});
		test('can recibe a name with dotNotation', () => {
			expect(getColor('grey.dark')).toBe('#939598');
		});
		test('can recibe two arguments', () => {
			expect(getColor('grey', 'dark')).toBe('#939598');
		});
		test('return color passed in param when not found in pallete', () => {
			expect(getColor('brown')).toBe('brown');
		});
	});
});
