import palette from './palette';
import { get, isObject } from 'lodash';

/**
 * @name getColor
 * @private
 * @module palette/utils
 * @description return color from palette
 * @param {string} type
 * @param {string} color
 * @returns {string} color
 * @example getColor('primary', 'main') // #2979FF
 */

const getColor = (type = 'primary', color) => {
	const currentColor = color ? `${type}.${color}` : type;

	const currentType = color ? type : currentColor.split('.')[0];

	let selectedColor = get(palette, currentColor);

	selectedColor = isObject(selectedColor) ? get(palette, `${currentType}.main`) : selectedColor;

	return selectedColor || currentColor;
};

export { getColor };
