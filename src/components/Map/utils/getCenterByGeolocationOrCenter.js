import getGeolocationCoordinates from './getGeolocationCoordinates';

/**
 * Checks if the given center object contains valid latitude and longitude values.
 * @param {Object} center The center object to validate.
 * @param {number} center.lat The latitude value of the center.
 * @param {number} center.lng The longitude value of the center.
 * @returns {boolean} Returns true if the center has valid lat and lng properties, otherwise false.
 */
const isValidCenter = (center) => {
	if (!center) return false;
	if (!center.lat || !center.lng) return false;
	return true;
};

/**
 * Sets the map center based on the provided markers or a default center value.
 * @param {Object} center A default center object with latitude and longitude values.
 * @param {number} center.lat The latitude value of the default center.
 * @param {number} center.lng The longitude value of the default center.
 */
const getCenterByGeolocationOrCenter = async (center) => {
	if (isValidCenter(center)) return { lat: center.lat, lng: center.lng };
	return await getGeolocationCoordinates();
};

export default getCenterByGeolocationOrCenter;
