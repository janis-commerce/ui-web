import { getBounds, showAllMarkers } from './utils';

export const setCenterByMarkers = (mapRef, markers, center, firstLoad, setFirstLoad) => {
	if (!mapRef || !mapRef.current) return;
	if (!!markers.length && !firstLoad) {
		const centerCoordinate = !markers.length ? center : getBounds(markers).getCenter();
		showAllMarkers(mapRef.current, markers, centerCoordinate);
		if (!markers.length) mapRef.current.setZoom(13);
		setFirstLoad(true);
	}
};
