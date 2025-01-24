import axios from 'axios';
import { DIRECTIONS_URL } from './constants';
import { decode } from '@mapbox/polyline';
import formatWaypoints from './formatWaypoints';
import getGoogleHeaders from './getGoogleAPIKEYHeaders';

const fetchPolylines = (waypointsChunks, googleMapsApiKey) => {
	let route = {};
	const allCoords = waypointsChunks.reduce(async (coordsAccumulator, currentChunk) => {
		const coordinates = coordsAccumulator;
		const body = formatWaypoints(currentChunk);
		const header = getGoogleHeaders(googleMapsApiKey);
		// eslint-disable-next-line no-await-in-loop
		const { data } = await axios.post(DIRECTIONS_URL, body, header);
		const points = decode(data.routes[0].polyline.encodedPolyline);
		const coords = points.map((point) => ({
			lat: point[0],
			lng: point[1]
		}));
		route = data.routes[0];
		return [...coordinates, ...coords];
	}, []);
	return { allCoords, route };
};

export default fetchPolylines;
