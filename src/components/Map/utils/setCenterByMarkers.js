import { getBounds, showAllMarkers } from './utils';

/**
 * Sets the center of the map based on the provided markers or a default center value.
 * @param {Object} mapRef A reference to the map object.
 * @param {Array} markers An array of marker objects to determine the map center.
 * @param {Object} center A default center object with latitude and longitude values.
 * @param {number} center.lat The latitude value of the default center.
 * @param {number} center.lng The longitude value of the default center.
 * @param {boolean} firstLoad A flag indicating whether the map has been loaded for the first time.
 * @param {Function} setFirstLoad A callback function to update the `firstLoad` flag.
 */
const setCenterByMarkers = (mapRef, markers, center, firstLoad, setFirstLoad) => {
	if (!mapRef || !mapRef.current) return;
	if (!!markers.length && !firstLoad) {
		const centerCoordinate = !markers.length ? center : getBounds(markers).getCenter();
		showAllMarkers(mapRef.current, markers, centerCoordinate);
		if (!markers.length) mapRef.current.setZoom(13);
		setFirstLoad(true);
	}
};

export default setCenterByMarkers;
