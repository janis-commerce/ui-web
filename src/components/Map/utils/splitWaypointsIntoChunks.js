/**
 * Splits the waypoints list into sublists of X size
 * @param {array} waypoints list of waypoints
 * @param {number} chunkSize amount of waypoints per request
 * @returns {array} a waypoints list containing those sublists according to provided size
 */
export default (waypoints = [], chunkSize = 0) => {
	const result = [];
	for (let i = 0; i < waypoints.length; i += chunkSize) {
		result.push(waypoints.slice(i, i + chunkSize));
	}
	return result;
};
