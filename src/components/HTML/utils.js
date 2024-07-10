/**
 * Depending of the given value returns a height measure
 * By default return 400
 * @param {string | number} value
 */
export const getHeight = (value) => {
	let defaultMeasure = 400;

	if (!value) return defaultMeasure;

	const heightValue = {
		large: 600,
		full: window.innerHeight - 250
	}

	return typeof value === 'number' ? value : heightValue[value] || defaultMeasure;
};