import promiseWrapper from 'utils/promiseWrapper';
import { getPolylineDirections, parseCoordsForPolylines, validateCoordinates } from './';

/**
 * Calculates route directions and processes them for use in a mapping application.
 * @param {Object} routeData An object with route information, including points with coordinates.
 * @param {Function} callbackOnSuccessDirections A callback function to save route details after processing.
 * @param {Function} callbackOnErrorDirections A callback that is invoked when an error occurred while obtaining directions.
 * @param {string} googleMapsApiKey The API key for accessing Google Maps services.
 * @returns {Promise[]} a promise array with all coordinates
 */
export default async ({
	routeData = {},
	callbackOnSuccessDirections = () => {},
	callbackOnErrorDirections = () => {},
	googleMapsApiKey = ''
}) => {
	const validCoordinates =
		Array.isArray(routeData?.points) &&
		routeData?.points?.filter((coord) => validateCoordinates(coord.position)).filter(Boolean);

	const waypoints = validCoordinates?.length > 2 ? validCoordinates.slice(1, -1) : [];

	const parsedCoords = parseCoordsForPolylines(validCoordinates);
	const [validDirections, directionsError] = await promiseWrapper(
		getPolylineDirections({
			coordinates: parsedCoords,
			googleMapsApiKey,
			waypoints
		})
	);
	if (directionsError) {
		if (callbackOnErrorDirections) callbackOnErrorDirections(directionsError);
		return directionsError;
	}

	const { allCoords, route } = validDirections;

	if (callbackOnSuccessDirections) callbackOnSuccessDirections(route);

	return allCoords;
};
