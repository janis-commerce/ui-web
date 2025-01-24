/**
 * Maps every marker to extend the map's bounds so they can all be initially shown
 * @param {Array} markers Array of markers
 * @returns Returns the bounds of the map
 */
export const getBounds = (markers) => {
	const bounds = new window.google.maps.LatLngBounds();
	markers.map(({ lat, lng }) => {
		return bounds.extend(new window.google.maps.LatLng(lat, lng));
	});

	return bounds;
};
