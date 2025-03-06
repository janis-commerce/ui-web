import React, { useState, useRef, useCallback } from 'react';
import { GoogleMap, useJsApiLoader } from '@react-google-maps/api';
import PropTypes from 'prop-types';
import MarkersDrawer from './components/MarkersDrawer';
import SearchBox from './components/SearchBox';
import { LIBRARIES, INITIAL_CONTROLS_POSITION, DEFAULT_CENTER } from './utils/constants';
import { getMapOptions, getBoundsFromMarkers, getCenterByGeolocationOrCenter } from './utils';

const Map = ({
	googleMapsApiKey = '',
	width = '800px',
	height = '400px',
	center = DEFAULT_CENTER,
	zoom = 13,
	markers = [],
	options = {},
	callbackOnSuccessDirections = () => {},
	callbackOnErrorDirections = () => {},
	...props
}) => {
	const { isLoaded } = useJsApiLoader({
		googleMapsApiKey,
		libraries: LIBRARIES
	});

	const mapRef = useRef();
	const [controlsPositions, setControlsPositions] = useState(INITIAL_CONTROLS_POSITION);

	const validMarkersExist = Array.isArray(markers) && markers.length;

	const handlePositions = (key, value) => {
		setControlsPositions((prev) => ({ ...prev, [key]: value }));
	};

	const mapOptions = getMapOptions(options, controlsPositions);

	const updateMarker = (newCenter) => {
		mapRef.current.setCenter(newCenter);
		if (mapRef.current) {
			mapRef.current.panTo(newCenter);
		}
	};

	const onLoad = useCallback(
		(map) => {
			if (!map) return;
			mapRef.current = map;

			mapRef.current.setOptions({
				gestureHandling: 'greedy'
			});

			const fullScreenPos = mapOptions.showSearchBar ? 'RIGHT_BOTTOM' : 'RIGHT_TOP';
			handlePositions('fullScreen', window.google.maps.ControlPosition[fullScreenPos]);
			handlePositions('zoom', window.google.maps.ControlPosition.RIGHT_BOTTOM);

			if (!markers?.length)
				mapRef.current.setCenter(getCenterByGeolocationOrCenter(center || DEFAULT_CENTER));

			if (markers?.length) mapRef.current.fitBounds(getBoundsFromMarkers(markers));
			mapRef.current.setZoom(zoom);
		},
		[center, markers, options, zoom]
	);

	if (!isLoaded) return null;

	return (
		<GoogleMap
			className="google-map-component"
			onLoad={onLoad}
			mapContainerStyle={{ height, width }}
			options={mapOptions}
			center={mapRef.current?.center}
			{...props}
		>
			{mapOptions.showSearchBar && (
				<SearchBox updateMarker={updateMarker} className="google-map-component__search-box" />
			)}
			{validMarkersExist && (
				<MarkersDrawer
					markers={markers}
					readOnly={mapOptions.readOnly}
					callbackOnSuccessDirections={callbackOnSuccessDirections}
					callbackOnErrorDirections={callbackOnErrorDirections}
					googleMapsApiKey={googleMapsApiKey}
				/>
			)}
		</GoogleMap>
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
			polylines: PropTypes.array,
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
	/** Prevents markers from being moved */
	/** Config to customize map */
	options: PropTypes.shape({}),
	/** Callback that is called when directions are obtained, polylines are passed as argument on call */
	callbackOnSuccessDirections: PropTypes.func,
	/** Callback that is called when an error occurred when directions are obtained */
	callbackOnErrorDirections: PropTypes.func
};

export default Map;
