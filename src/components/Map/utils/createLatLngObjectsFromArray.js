import { formatCoordinates } from './formatCoordinates';

/**
 * takes an array of waypoints and returns them parsed
 *
 * @param {array} waypoints
 * @return {array}
 */
export const createLatLngObjectsFromArray = (waypoints = []) => {
	if (!waypoints.length) return [];

	return waypoints
		.map((waypoint) => formatCoordinates(waypoint.position.lat, waypoint.position.lng))
		.filter(Boolean);
};
