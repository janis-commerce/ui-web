/**
 * Retrieves the current geolocation of the user and updates the map's center coordinates.
 * @param {Function} setCoords A callback function to update the map's center coordinates with the retrieved latitude and longitude.
 */
const setCoordinatesForGeolocation = (setCoords) => {
	navigator.geolocation.getCurrentPosition((pos) => {
		const {
			coords: { latitude, longitude }
		} = pos;

		setCoords({ lat: latitude, lng: longitude });
	});
};

export default setCoordinatesForGeolocation;
