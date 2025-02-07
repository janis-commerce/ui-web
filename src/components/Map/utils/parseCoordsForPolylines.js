import { isValidLocation } from './';

/**
 * takes an array of coordinates with it's type, and parses it into valid coordinates to draw a polyline
 *
 * @param {array} coords
 * @return {object} of coordinates to draw polylines
 */
export default (coords = []) => {
	if (!coords.length) return {};

	const origin = coords[0].position;
	const destination = coords[coords.length - 1].position;

	if (!isValidLocation(origin) || !isValidLocation(destination)) return {};

	const coordinate = { origin, destination };

	return coordinate;
};
