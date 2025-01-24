/**
 * Retrieves the current geolocation of the user and updates the map's center coordinates.
 */
const getGeolocationCoordinates = () => {
	return new Promise((resolve, reject) => {
		navigator.geolocation.getCurrentPosition(
			(pos) => {
				const {
					coords: { latitude, longitude }
				} = pos;

				resolve({ lat: latitude, lng: longitude });
			},
			(error) => {
				reject(error);
			}
		);
	});
};

export default getGeolocationCoordinates;
