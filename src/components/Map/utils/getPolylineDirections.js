import { createLatLngObjectsFromArray, formatCoordinates, isObject } from './utils';
import axios from 'axios';
import { decode } from '@mapbox/polyline';

const directionsURL = 'https://routes.googleapis.com/directions/v2:computeRoutes';
const maxWaypointsPerRequest = 25;

/**

Retrieves the polyline directions from Google Maps API based on the provided parameters.

@param {Object} params - An object containing the parameters for the API request.
@returns {Promise<Array<Object>>} - A Promise that resolves to an array of coordinates.

@throws {Error} - If params is not a valid object or any of its properties are not valid.

*/
export const getPolylineDirections = async (params = {}) => {
	try {
		if (!params || !isObject(params) || !Object.keys(params).length)
			throw new Error('params is not a valid object');
		const {
			coordinates: { origin, destination },
			googleMapsApiKey,
			waypoints
		} = params;

		const allWaypoints = [
			formatCoordinates(origin.lat, origin.lng),
			...createLatLngObjectsFromArray(waypoints),
			formatCoordinates(destination.lat, destination.lng)
		];

        console.log({allWaypoints, waypoints});

		const numRequests = Math.ceil(allWaypoints.length / maxWaypointsPerRequest);
		let allCoords = [];
		let route = {};

		for (let i = 0; i < numRequests; i++) {
			const startIndex = i * maxWaypointsPerRequest;
			const endIndex = Math.min(startIndex + maxWaypointsPerRequest, allWaypoints.length);
			let waypointsSubset = allWaypoints.slice(startIndex, endIndex);

			waypointsSubset = [
				waypointsSubset[0],
				...waypointsSubset.slice(1, -1),
				waypointsSubset[waypointsSubset.length - 1]
			];

			const body = {
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
			const header = {
				headers: {
					'content-type': 'application/json',
					'x-goog-api-key': googleMapsApiKey,
					'x-goog-fieldmask': '*'
				}
			};
			// eslint-disable-next-line no-await-in-loop
			const { data } = await axios.post(directionsURL, body, header);
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
