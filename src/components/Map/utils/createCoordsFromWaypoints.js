import { formatCoordinates } from './';

/**
 * takes an array of waypoints and returns them parsed
 * @param {array} waypoints - list of waypoints
 * @return {array} - waypoints list with formatted coordinates
 */
export default (waypoints = []) => {
	if (!waypoints.length) return [];

	return waypoints
		.map((waypoint) => formatCoordinates(waypoint.position.lat, waypoint.position.lng))
		.filter(Boolean);
};
