import { intersection } from 'lodash';
import getParsedComponents from './getParsedComponents';
import parsePlaces from './parsePlaces';

/**
 * Get places data for the provided coordinates
 * @param {lat, lng} latLng a Google latLng object
 */
const getPlaces = (latLng) =>
	new Promise((resolve) => {
		const geocoder = new window.google.maps.Geocoder();
		geocoder.geocode({ location: latLng }, (results) => resolve(results));
	});

/**
 * Gets places from the given coordinates and parses their data into friendlier values.
 * @param {lat, lng} latLng A Google latLng object.
 * @param {Array} preferredTypes Array of place types to match with the getPlaces results to increase the parsing accuracy.
 */
export const parseAddressComponents = async (latLng, preferredTypes = []) => {
	if (!latLng) return {};

	const places = await getPlaces(latLng);

	if (!places || !places.length) return {};
	/** Grab the main result according to the search result's types.
	 * If no preferredTypes are provided, set the first result as the main one. */
	const place =
		places.find((result) => !!intersection(result.types, preferredTypes).length) || places[0];

	let parsedData = {};

	/* Get most accurate data from the main result */
	if (place.address_components) {
		parsedData = getParsedComponents(place);
	}

	/* Go deeper to find the right city and neighborhood values */
	if (places.length) {
		return parsePlaces(places, parsedData);
	}
};
