import { isObject } from './utils';
import axios from 'axios';
import { decode } from '@mapbox/polyline';
import { DIRECTIONS_URL, MAX_WAYPOINTS_PER_REQUEST } from './constants';
import formatBody from './formatBody';
import getGoogleHeaders from './getGoogleAPIKEYHeaders';
import getAllWaypoints from './getAllWaypoints';
import keepWaypointsEdges from './keepWaypointsEdges';

/**

Retrieves the polyline directions from Google Maps API based on the provided parameters.

@param {Object} params - An object containing the parameters for the API request.
@returns {Promise<Array<Object>>} - A Promise that resolves to an array of coordinates.

@throws {Error} - If params is not a valid object or any of its properties are not valid.

*/
const getPolylineDirections = async (params = {}) => {
	try {
		if (!params || !isObject(params) || !Object.keys(params).length)
			throw new Error('params is not a valid object');
		const {
			coordinates: { origin, destination },
			googleMapsApiKey,
			waypoints
		} = params;

		const allWaypoints = getAllWaypoints(origin, destination, waypoints);

		const numRequests = Math.ceil(allWaypoints.length / MAX_WAYPOINTS_PER_REQUEST);
		let allCoords = [];
		let route = {};

		for (let i = 0; i < numRequests; i++) {
			const startIndex = i * MAX_WAYPOINTS_PER_REQUEST;
			const endIndex = Math.min(startIndex + MAX_WAYPOINTS_PER_REQUEST, allWaypoints.length);
			let waypointsSubset = allWaypoints.slice(startIndex, endIndex);

			waypointsSubset = keepWaypointsEdges(waypointsSubset);

			const body = formatBody(waypointsSubset);
			const header = getGoogleHeaders(googleMapsApiKey);
			// eslint-disable-next-line no-await-in-loop
			const { data } = await axios.post(DIRECTIONS_URL, body, header);
			const points = decode(data.routes[0].polyline.encodedPolyline);
			const coords = points.map((point) => ({
				lat: point[0],
				lng: point[1]
			}));

			allCoords = allCoords.concat(coords);
			// eslint-disable-next-line prefer-destructuring
			route = data.routes[0];
		}

		return { allCoords, route };
	} catch (reason) {
		return Promise.reject(reason?.response?.data || reason);
	}
};

export default getPolylineDirections;
