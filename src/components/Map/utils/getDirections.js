import getPolylineDirections from './getPolylineDirections';
import parseCoordsForPolylines from './parseCoordsForPolylines';
import promiseWrapper from './promiseWrapper';
import validateCoordinates from './validateCoordinates';

/**
 * Calculates route directions and processes them for use in a mapping application.
 * @param {Object} options An object containing the necessary parameters for calculating directions.
 * @param {Object} options.routeData An object with route information, including points with coordinates.
 * @param {Function} options.saveRouteData A callback function to save route details after processing.
 * @param {string} options.googleMapsApiKey The API key for accessing Google Maps services.
 * @param {Function} options.setPolylines A callback function to update polylines with processed coordinates.
 */
const getRouteDirections = ({ routeData, saveRouteData, googleMapsApiKey, setPolylines }) => {
	const validCoordinates =
		Array.isArray(routeData?.points) &&
		routeData?.points?.filter((coord) => validateCoordinates(coord.position)).filter(Boolean);

	const waypoints = validCoordinates?.length > 2 ? validCoordinates.slice(1, -1) : [];

	const getDirections = async () => {
		const parsedCoords = parseCoordsForPolylines(validCoordinates);
		const [validDirections, directionsError] = await promiseWrapper(
			getPolylineDirections({
				coordinates: parsedCoords,
				googleMapsApiKey,
				waypoints
			})
		);
		if (directionsError) return directionsError;

		const { allCoords, route } = validDirections;

		if (saveRouteData) saveRouteData(route);

		return setPolylines(allCoords);
	};

	getDirections();
};

export default getRouteDirections;
