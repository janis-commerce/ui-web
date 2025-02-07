import { intersection } from 'lodash';

/**
 * Find the name of a location based on the type
 * @param {Object} place Object with the location data
 * @param {string} type Type of location to find
 * @returns Returns the name of the location
 */
const findName = (place = {}, type = '') => {
	if (!place.types.includes(type)) return null;

	const data = place.address_components
		? place.address_components.find((component) => component.types.includes(type))
		: place;

	return data.long_name;
};

/**
 * Parse the places data to get the city and neighborhood
 * @param {Array} places Array of places to parse
 * @param {Object} parsedData Object with the parsed data
 * @returns Returns the parsed data
 */
export default (places, parsedData) => {
	const dataTypes = ['locality', 'neighborhood', 'sublocality'];

	return places.reduce(
		(parsedComponents, place) => {
			const { types } = place;
			const [match] = intersection(types, dataTypes);

			const name = match === 'locality' ? 'city' : 'neighborhood';

			if (types.includes(match)) return { ...parsedComponents, [name]: findName(place, match) };

			return parsedComponents;
		},
		{ ...parsedData }
	);
};
