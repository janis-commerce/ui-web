import axios from 'axios';
import { decode } from '@mapbox/polyline';
import { DIRECTIONS_URL } from './constants';
import { formatWaypoints, getGoogleHeaders } from './';

export default (waypointsChunks = [], googleMapsApiKey = '') => {
	let route = {};
	const allCoords = waypointsChunks.reduce(async (coordinates, currentChunk) => {
		const formattedWaypoints = formatWaypoints(currentChunk);
		const headers = getGoogleHeaders(googleMapsApiKey);
		// eslint-disable-next-line no-await-in-loop
		const { data } = await axios.post(DIRECTIONS_URL, formattedWaypoints, headers);
		const points = decode(data?.routes[0]?.polyline?.encodedPolyline);
		const coords = points.map((point) => ({
			lat: point[0],
			lng: point[1]
		}));
		route = data.routes[0];
		return [...coordinates, ...coords];
	}, []);
	return { allCoords, route };
};
