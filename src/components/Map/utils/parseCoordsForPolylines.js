import { validLocation } from './utils';

/**
 * takes an array of coordinates with it's type, and parses it into valid coordinates to draw a polyline
 *
 * @param {array} coords
 * @return {object} of coordinates to draw polylines
 */
const parseCoordsForPolylines = (coords) => {
	if (!coords || !Array.isArray(coords) || !coords.length) return {};

	const origin = coords[0].position;
	const destination = coords[coords.length - 1].position;

	const validPickupLocation = validLocation(origin);
	const validDestinationLocation = validLocation(destination);

	if (!validPickupLocation || !validDestinationLocation) return {};

	const coordinate = { origin, destination };

	return coordinate;
};

export default parseCoordsForPolylines;
