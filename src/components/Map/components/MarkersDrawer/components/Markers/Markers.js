import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { debounce } from 'utils';
import Marker from './components/Marker';

const Markers = ({ readOnly = true, markers = [], markerOptions = {} }) => {
	const [activeMarkerId, setActiveMarkerId] = useState(null);
	const [mouseOverInfoWindow, setMouseOverInfoWindow] = useState(false);

	const openInfoWindow = (markerId) => setActiveMarkerId(markerId);
	const closeInfoWindow = () => setActiveMarkerId(null);

	const delayedInfoWindowHover = debounce(() => {
		if (!mouseOverInfoWindow) closeInfoWindow();
	}, 100);

	const handleMarkerMouseOver = (marker, markerId) => {
		if (!marker?.infoWindowContent) return;

		const { onInfoWindowChange = () => {} } = markerOptions;
		onInfoWindowChange();

		openInfoWindow(markerId);
	};

	const handleMarkerMouseOut = () => delayedInfoWindowHover();

	const handleInfoWindowMouseEnter = () => {
		delayedInfoWindowHover.cancel();
		setMouseOverInfoWindow(true);
	};

	const handleInfoWindowMouseLeave = () => {
		closeInfoWindow();
		setMouseOverInfoWindow(false);
	};

	useEffect(() => {
		return () => {
			delayedInfoWindowHover.cancel();
		};
	}, []);

	if (!markers.length) return null;

	return (
		<>
			{markers.map((marker, idx) => {
				const uniqueId = `${marker?.position?.lat}-${marker?.position?.lng}/${idx.toString()}`;
				return (
					<Marker
						markerData={{
							...marker,
							infoWindowOpen: marker?.showInfoWindow || activeMarkerId === uniqueId
						}}
						markerOptions={{
							...markerOptions,
							onMarkerMouseOver: () => handleMarkerMouseOver(marker, uniqueId),
							onMarkerMouseOut: handleMarkerMouseOut,
							onInfoWindowMouseEnter: handleInfoWindowMouseEnter,
							onInfoWindowMouseLeave: handleInfoWindowMouseLeave
						}}
						key={uniqueId}
						readOnly={readOnly}
						markerIdx={idx}
					/>
				);
			})}
		</>
	);
};

Markers.propTypes = {
	markers: PropTypes.arrayOf(PropTypes.shape({})),
	markerOptions: PropTypes.shape({}),
	readOnly: PropTypes.bool
};

export default Markers;
