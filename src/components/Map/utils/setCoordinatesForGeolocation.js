export const setCoordinatesForGeolocation = (setCoords) => {
	navigator.geolocation.getCurrentPosition((pos) => {
		const {
			coords: { latitude, longitude }
		} = pos;

		setCoords({ lat: latitude, lng: longitude });
	});
};
