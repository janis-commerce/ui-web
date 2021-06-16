import palette from './palette';

const validateString = (str) => !!(typeof str === 'string');

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
const getColor = (type, color) => {
	if (!validateString(type) || !validateString(color)) return '';

	const colorType = palette[type.toLowerCase()];
	if (!colorType) return '';

	const selectedColor = colorType[color.toLowerCase()];
	if (!selectedColor) return '';

	return selectedColor;
};

export { getColor };
