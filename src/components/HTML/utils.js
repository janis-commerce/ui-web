/**
 * Depending of the given value returns a height measure
 * By default return 400
 * @param {string | number} value
 */
export const getHeight = (value) => {
	let measure = 400;

	if (!value) return measure;

	switch (value) {
		case 'large':
			measure = 600;
			break;
		case 'full':
			measure = window.innerHeight - 250;
			break;
		default:
			break;
	}

	return typeof value === 'number' ? value : measure;
};
