import { validLocation } from './validLocation';

/**
 * takes an array of coordinates with it's type, and parses it into valid coordinates to draw a polyline
 *
 * @param {array} coords
 * @return {object} of coordinates to draw polylines
 */
const parseCoordsForPolylines = (coords = []) => {
	if (!coords.length) return {};

	const origin = coords[0].position;
	const destination = coords[coords.length - 1].position;

	if (!validLocation(origin) || !validLocation(destination)) return {};

	const coordinate = { origin, destination };

	return coordinate;
};

export default parseCoordsForPolylines;
