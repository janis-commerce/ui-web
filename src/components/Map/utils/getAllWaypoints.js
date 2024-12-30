import { createLatLngObjectsFromArray, formatCoordinates } from './utils';

const getAllWaypoints = (origin, destination, waypoints) => {
	return [
		formatCoordinates(origin.lat, origin.lng),
		...createLatLngObjectsFromArray(waypoints),
		formatCoordinates(destination.lat, destination.lng)
	];
};

export default getAllWaypoints;
