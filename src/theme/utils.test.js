import { getColor } from './utils';

describe('theme functions', () => {
	describe('function getColor', () => {
		test('return a main color', () => {
			expect(getColor('white')).toBe('#FFF');
		});
		test('can recibe a name with dotNotation', () => {
			expect(getColor('darkGrey')).toBe('#939598');
		});
		test('return color passed in param when not found in pallete', () => {
			expect(getColor('brown')).toBe('brown');
		});
	});
});
