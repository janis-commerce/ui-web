import { createLatLngObjectsFromArray } from './createLatLngObjectsFromArray';
import { formatCoordinates } from './formatCoordinates';

/**
 * Format coordinates to be used in the map
 * @param {Object} origin Object with the origin data
 * @param {Object} destination Object with the destination data
 * @param {Array} waypoints List of waypoints
 * @returns Returns the list of waypoints
 */
const getAllWaypoints = (origin, destination, waypoints) => {
	return [
		formatCoordinates(origin.lat, origin.lng),
		...createLatLngObjectsFromArray(waypoints),
		formatCoordinates(destination.lat, destination.lng)
	];
};

export default getAllWaypoints;
