import { MAX_WAYPOINTS_PER_REQUEST } from './constants';
import { getAllWaypoints, splitWaypointsIntoChunks, fetchPolylines } from './';

/**

Retrieves the polyline directions from Google Maps API based on the provided parameters.

@param {Object} params - An object containing the parameters for the API request.
@returns {Promise<Array<Object>>} - A Promise that resolves to an array of coordinates.

@throws {Error} - If params is not a valid object or any of its properties are not valid.

*/
export default async (params = {}) => {
	try {
		if (!Object.keys(params).length) throw new Error('params is not a valid object');
		const {
			coordinates: { origin, destination },
			googleMapsApiKey,
			waypoints
		} = params;

		const allWaypoints = getAllWaypoints(origin, destination, waypoints);
		const waypointsChunks = splitWaypointsIntoChunks(allWaypoints, MAX_WAYPOINTS_PER_REQUEST);

		return fetchPolylines(waypointsChunks, googleMapsApiKey);
	} catch (reason) {
		return Promise.reject(reason?.response?.data || reason);
	}
};
