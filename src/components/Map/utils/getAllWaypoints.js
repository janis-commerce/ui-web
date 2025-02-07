import { formatCoordinates, createCoordsFromWaypoints } from './';

/**
 * Format coordinates to be used in the map
 * @param {Object} origin Object with the origin data
 * @param {Object} destination Object with the destination data
 * @param {Array} waypoints List of waypoints
 * @returns Returns the list of waypoints
 */
export default (origin = {}, destination = {}, waypoints = []) => {
	return [
		formatCoordinates(origin.lat, origin.lng),
		...createCoordsFromWaypoints(waypoints),
		formatCoordinates(destination.lat, destination.lng)
	];
};
