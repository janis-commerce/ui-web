import React, { useState, useRef, useCallback } from 'react';
import { GoogleMap, useJsApiLoader } from '@react-google-maps/api';
import PropTypes from 'prop-types';
import MarkersDrawer from './components/MarkersDrawer';
import SearchBox from './components/SearchBox';
import { LIBRARIES, INITIAL_CONTROLS_POSITION } from './utils/constants';
import { getMapOptions, getBoundsFromMarkers, getCenterByGeolocationOrCenter } from './utils';

const Map = ({
	googleMapsApiKey = '',
	width = '800px',
	height = '400px',
	center = {},
	zoom = 13,
	markers = [],
	showSearchBar = false,
	readOnly = true,
	showPOI = false,
	callbackOnSuccessDirections = () => {},
	callbackOnErrorDirections = () => {}
}) => {
	const { isLoaded } = useJsApiLoader({
		googleMapsApiKey,
		libraries: LIBRARIES
	});

	const mapRef = useRef();

	const [controlsPositions, setControlsPositions] = useState(INITIAL_CONTROLS_POSITION);

	const validMarkersExist = Array.isArray(markers) && markers.length;

	const defaultMapCenter = { center: { lat: 0, lng: 0 }, zoom };

	const handlePositions = (key, value) => {
		setControlsPositions((prev) => ({ ...prev, [key]: value }));
	};

	const mapOptions = getMapOptions(showPOI, controlsPositions);

	const onLoad = useCallback((map) => {
		if (!map) return;
		mapRef.current = map;

		map.setOptions({
			gestureHandling: 'greedy'
		});

		const fullScreenPos = showSearchBar ? 'RIGHT_BOTTOM' : 'RIGHT_TOP';
		handlePositions('fullScreen', window.google.maps.ControlPosition[fullScreenPos]);
		handlePositions('zoom', window.google.maps.ControlPosition.RIGHT_BOTTOM);

		if (!markers?.length) return map.setCenter(getCenterByGeolocationOrCenter(center));

		map.fitBounds(getBoundsFromMarkers(markers));
		mapRef.current.setZoom(zoom);
	}, []);

	return isLoaded ? (
		<GoogleMap
			className="google-map-component"
			onLoad={onLoad}
			mapContainerStyle={{ height, width }}
			options={mapOptions}
			{...defaultMapCenter}
		>
			<>
				{showSearchBar && <SearchBox className="google-map-component__search-box" />}
				{validMarkersExist && (
					<MarkersDrawer
						markers={markers}
						readOnly={readOnly}
						callbackOnSuccessDirections={callbackOnSuccessDirections}
						callbackOnErrorDirections={callbackOnErrorDirections}
						googleMapsApiKey={googleMapsApiKey}
					/>
				)}
			</>
		</GoogleMap>
	) : (
		<></>
	);
};

Map.propTypes = {
	/** String that contains the API KEY for google maps api */
	googleMapsApiKey: PropTypes.string,
	/** Map width */
	width: PropTypes.string,
	/** Map height */
	height: PropTypes.string,
	/** Allows to declare a point where the map is centered, its used when there no markers available */
	center: PropTypes.shape({ lat: PropTypes.number, lng: PropTypes.number }),
	/** Map zoom */
	zoom: PropTypes.number,
	/** Load markers from outside the component */
	markers: PropTypes.arrayOf(
		PropTypes.shape({
			drawRoute: PropTypes.bool,
			points: PropTypes.arrayOf(
				PropTypes.shape({
					position: PropTypes.shape({ lat: PropTypes.number, lng: PropTypes.number }),
					icon: PropTypes.object,
					overlay: PropTypes.element,
					infoWindowChildren: PropTypes.element
				})
			),
			polylineOptions: PropTypes.shape({
				strokeColor: PropTypes.string,
				strokeOpacity: PropTypes.number,
				strokeWeight: PropTypes.number
			})
		})
	),
	/** Enables search bar (in combination with canAddMarkers) */
	showSearchBar: PropTypes.bool,
	/** Prevents markers from being moved */
	readOnly: PropTypes.bool,
	/** Enables points of interest on the map */
	showPOI: PropTypes.bool,
	/** Callback that is called when directions are obtained, polylines are passed as argument on call */
	callbackOnSuccessDirections: PropTypes.func,
	/** Callback that is called when an error occurred when directions are obtained */
	callbackOnErrorDirections: PropTypes.func
};

export default Map;
