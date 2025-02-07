import { formatCoordinates } from './';

/**
 * takes an array of waypoints and returns them parsed
 *
 * @param {array} waypoints
 * @return {array}
 */
export default (waypoints = []) => {
	if (!waypoints.length) return [];

	const obj = waypoints
		.map((waypoint) => formatCoordinates(waypoint.position.lat, waypoint.position.lng))
		.filter(Boolean);
	console.log({ obj });
	return obj;
};
