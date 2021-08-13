import palette from './palette';
import { get } from 'lodash';

/**
 * @name getColor
 * @private
 * @module palette/utils
 * @description return color from palette/palette
 * @param {string} type
 * @param {string} color
 * @returns {string} color
 * @example getColor('primary', 'main') // #2979FF
 */

const getColor = (type = 'primary', color) => {
	const currentColor = color ? `${type}.${color}` : type;

	const currentType = color ? type : currentColor.split('.')[0];

	let selectedColor = get(palette, currentColor);

	selectedColor = selectedColor || get(palette, `${currentType}.main`);

	return selectedColor || currentColor;
};

export { getColor };
