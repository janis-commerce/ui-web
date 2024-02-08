import { findColorInPalette } from './utils';

describe('theme functions', () => {
	describe('function findColorInPalette', () => {
		test('return a main color', () => {
			expect(findColorInPalette('white')).toBe('#FFF');
		});
		test('can recibe a name with dotNotation', () => {
			expect(findColorInPalette('darkGrey')).toBe('#939598');
		});
		test('return color passed in param when not found in pallete', () => {
			expect(findColorInPalette('brown')).toBe('brown');
		});
	});
});
