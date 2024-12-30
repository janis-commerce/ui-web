const formatBody = (waypointsSubset) => {
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

export default formatBody;
