import palette from './palette';

/**
 * @name findColorInPalette
 * @private
 * @module palette/utils
 * @description return color from palette
 * @param {string} color
 * @returns {string} color
 * @example findColorInPalette('blue') // #2979FF
 */
const findColorInPalette = (color) => palette[color] || color;

const timingFunctions = {
	standard: 'cubic-bezier(0.4, 0, 0.2, 1)',
	decelerate: 'cubic-bezier(0.0, 0.0, 0.2, 1)',
	accelerate: 'cubic-bezier(0.4, 0.0, 1, 1)'
};

export { findColorInPalette, timingFunctions };
