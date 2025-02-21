import { getBounds } from './';
/**
 * If there are several markers, updates the map's bounds to show them all, otherwise, the map keeps its original position
 * @param {Array} markers List of markers
 * @returns Returns the bounds of the map
 */
export default (markers = []) => {
	const markersFlatted = markers.flatMap((marker) => marker?.points.map((point) => point.position));
	return getBounds(markersFlatted);
};
