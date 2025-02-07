/**
 * Function to format waypoints for the routing API
 * @param {Array} waypointsSubset Array of waypoints
 * @returns Returns the formatted waypoints
 */
export default (waypointsSubset = []) => {
	if (!waypointsSubset.length) return;

	return {
		origin: waypointsSubset[0],
		destination: waypointsSubset[waypointsSubset.length - 1],
		intermediates: waypointsSubset.slice(1, -1),
		travelMode: 'drive',
		routingPreference: 'traffic_unaware',
		polylineQuality: 'high_quality',
		computeAlternativeRoutes: false,
		routeModifiers: {
			avoidTolls: false,
			avoidHighways: false,
			avoidFerries: false,
			avoidIndoor: false
		}
	};
};
