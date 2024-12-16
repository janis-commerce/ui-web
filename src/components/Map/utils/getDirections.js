import { getPolylineDirections } from './getPolylineDirections';
import { parseCoordsForPolylines } from './parseCoordsForPolylines';
import { promiseWrapper } from './promiseWrapper';
import validateCoordinates from './validateCoordinates';

export const getRouteDirections = ({
	routeData,
	saveRouteData,
	googleMapsApiKey,
	setPolylines
}) => {
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
