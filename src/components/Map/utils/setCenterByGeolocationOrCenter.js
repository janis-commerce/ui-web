import setCoordinatesForGeolocation from "./setCoordinatesForGeolocation";

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
 * @param {Array} markers An array of marker objects to determine the map center.
 * @param {Function} setCoords A callback function to update the map's center coordinates.
 * @param {Object} center A default center object with latitude and longitude values.
 * @param {number} center.lat The latitude value of the default center.
 * @param {number} center.lng The longitude value of the default center.
 */
const setCenterByGeolocationOrCenter = (markers, setCoords, center) => {
	if (!markers.length && isValidCenter(center))
		return setCoords({ lat: center.lat, lng: center.lng });
	setCoordinatesForGeolocation(setCoords);
};

export default setCenterByGeolocationOrCenter;
