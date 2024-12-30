const keepWaypointsEdges = (waypointsSubset) => {
	return [
		waypointsSubset[0],
		...waypointsSubset.slice(1, -1),
		waypointsSubset[waypointsSubset.length - 1]
	];
};

export default keepWaypointsEdges;
