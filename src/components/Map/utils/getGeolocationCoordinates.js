/**
 * Retrieves the current geolocation of the user and updates the map's center coordinates.
 */
export default () => {
	try {
		navigator.geolocation.getCurrentPosition((pos = {}) => {
			const {
				coords: { latitude: lat, longitude: lng }
			} = pos;

			return { lat, lng };
		});
	} catch (error) {
		console.log(error);
		return {};
	}
};
