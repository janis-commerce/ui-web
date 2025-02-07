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
	showSearchBar = false,
	markers = [],
	readOnly = true,
	showPOI = false,
	zoom = 13,
	callbackOnSuccessDirections = () => {},
	callbackOnErrorDirections = () => {}
}) => {
	const { isLoaded } = useJsApiLoader({
		googleMapsApiKey,
		LIBRARIES
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
	/** If new markers can be added */
	canAddMarkers: PropTypes.bool,
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
	/** Maximum markers to display */
	maxMarkersQuantity: PropTypes.number,
	/** Prevents markers from being moved */
	readOnly: PropTypes.bool,
	/** Enables search bar (in combination with canAddMarkers) */
	showSearchBar: PropTypes.bool,
	/** Callback that executes when an marker was updated */
	updateMarkerCallback: PropTypes.func,
	/** Map height */
	height: PropTypes.string,
	/** Map width */
	width: PropTypes.string,
	/** Determines if markers can be draggable. If `showSearchBar` or `canAddMarkers` are enabled,
	 * this prop will always evaluate to true.
	 */
	canDragMarkers: PropTypes.bool,
	/** Enables points of interest on the map */
	showPOI: PropTypes.bool,
	/** Allows to declare a point where the map is centered, its used when there no markers available */
	center: PropTypes.shape({ lat: PropTypes.number, lng: PropTypes.number }),
	/** String that contains the API KEY for google maps api */
	googleMapsApiKey: PropTypes.string,
	/** Map zoom */
	zoom: PropTypes.number,
	/** Callback that is called when directions are obtained, polylines are passed as argument on call */
	callbackOnSuccessDirections: PropTypes.func,
	/** Callback that is called when an error occurred when directions are obtained */
	callbackOnErrorDirections: PropTypes.func
};

export default Map;
