const { setCoordinatesForGeolocation } = require('./setCoordinatesForGeolocation');

const isValidCenter = (center) => {
	if (!center) return false;
	if (center.lat && center.lng) {
		return true;
	}
};

export const setCenterByGeolocationOrCenter = (markers, setCoords, center) => {
	if (!markers.length && isValidCenter(center))
		return setCoords({ lat: center.lat, lng: center.lng });
	setCoordinatesForGeolocation(setCoords);
};
