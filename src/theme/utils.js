import palette from './palette';

/**
 * @name getColor
 * @private
 * @module palette/utils
 * @description return color from palette
 * @param {string} color
 * @returns {string} color
 * @example getColor('blue') // #2979FF
 */
const getColor = (color) => palette[color] || color;

const timingFunctions = {
	standard: 'cubic-bezier(0.4, 0, 0.2, 1)',
	decelerate: 'cubic-bezier(0.0, 0.0, 0.2, 1)',
	accelerate: 'cubic-bezier(0.4, 0.0, 1, 1)'
};

/**
 * @name getImageMeasurements
 * @description return color from palette
 * @param {string} size
 * @param {boolean} isDesktop
 * @returns {string}
 * @example getImageMeasurements('large', true) // '36px'
 */
const getImageMeasurements = (size, isDesktop) => {
	if (!Number.isNaN(Number(size))) return `${size}px`;

	const imageSizes = {
		small: '24px',
		medium: '32px',
		large: '36px',
		extralarge: isDesktop ? '140px' : '100px',
		auto: 'auto'
	};

	return imageSizes[size] || imageSizes.small;
};

export { getColor, getImageMeasurements, timingFunctions };
