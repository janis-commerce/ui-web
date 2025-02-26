import { getGeolocationCoordinates, validateCoordinates } from './';

/**
 * Sets the map center based on the provided markers or a default center value.
 * @param {Object} center A default center object with latitude and longitude values.
 * @param {number} center.lat The latitude value of the default center.
 * @param {number} center.lng The longitude value of the default center.
 */
export default (center = {}) => {
	if (validateCoordinates(center)) return center;
	return getGeolocationCoordinates();
};
