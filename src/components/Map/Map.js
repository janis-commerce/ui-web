import React, { useState, useRef, useEffect } from 'react';
import { GoogleMap, useJsApiLoader } from '@react-google-maps/api';
import PropTypes from 'prop-types';
import { getBounds, showAllMarkers } from './utils/utils';
import MarkerDrawer from './components/MarkersDrawer';
import SearchBox from './components/SearchBox';
import { libraries, initialControlsPosition } from './utils/mapConstants';
import { getMapOptions } from './utils/getMapOptions';
import { setCoordinatesForGeolocation } from './utils/setCoordinatesForGeolocation';

const Map = ({
	googleMapsApiKey,
	height,
	width,
	center,
	showSearchBar = false,
	markers,
	readOnly = true,
	saveRouteData,
	showPOI
}) => {
	const [coordinates, setCoords] = useState({ lat: 0, lng: 0 });
	const { isLoaded } = useJsApiLoader({
		googleMapsApiKey,
		libraries
	});

	const mapRef = useRef();
	const [firstLoad, setFirstLoad] = useState(false);
	const [mapState, setMapState] = useState('');

	const [controlsPositions, setControlsPositions] = useState(initialControlsPosition);

	const validMarkersExist = Array.isArray(markers) && markers.length;

	const mapCenter = !validMarkersExist ? { center: coordinates } : {};

	const handlePositions = (key, value) => {
		setControlsPositions((prev) => ({ ...prev, [key]: value }));
	};

	const mapOptions = getMapOptions(showPOI, controlsPositions);

	useEffect(() => {
		if (!markers.length) return setCoords({ lat: center.lat, lng: center.lng });
		setCoordinatesForGeolocation(setCoords);
		if (!markers.length) return;
	}, []);

	const onLoad = (map) => {
		if (map) {
			mapRef.current = map;
			setMapState(mapRef);

			mapRef.current = map;

			map.setOptions({
				gestureHandling: 'greedy'
			});

			const fullScreenPos = showSearchBar ? 'RIGHT_BOTTOM' : 'RIGHT_TOP';
			handlePositions('fullScreen', window.google.maps.ControlPosition[fullScreenPos]);
			handlePositions('zoom', window.google.maps.ControlPosition.RIGHT_BOTTOM);

			if (!markers.length) return;
			showAllMarkers(map, markers);
		}
	};

	useEffect(() => {
		if (!mapRef || !mapRef.current) return;
		if (!!markers.length && !firstLoad) {
			const centerCoordinate = !markers.length ? center : getBounds(markers).getCenter();
			showAllMarkers(mapRef.current, markers, centerCoordinate);
			if (!markers.length) mapRef.current.setZoom(13);
			setFirstLoad(true);
		}
	}, [markers, mapState, center]);

	return isLoaded ? (
		<GoogleMap
			class="google-map-component"
			onLoad={(map) => onLoad(map)}
			mapContainerStyle={{ height, width }}
			options={mapOptions}
			{...mapCenter}
		>
			<>
				{showSearchBar && <SearchBox class="search-box-component" />}
				{validMarkersExist && (
					<MarkerDrawer
						markers={markers}
						readOnly={readOnly}
						//setMarker={setMarker}
						saveRouteData={saveRouteData}
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
		PropTypes.arrayOf({
			drawRoute: PropTypes.bool,
			/** Array of coordinates that  */
			points: PropTypes.arrayOf({
				/** Coordinates for marker position */
				position: {
					lat: PropTypes.number,
					lng: PropTypes.number
				},
				/** Object that contains the string url for drawing an icon */
				icon: PropTypes.shape({}),
				/** React component that is rendered bellow the marker */
				overlay: PropTypes.element,
				/** React component that is rendered in the tooltip of the marker on hover */
				infoWindowChildren: PropTypes.element
			}),
			/** Object that contains settable options for route drawing */
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
	/** Callback that is called when directions are obtained, polylines are passed as argument on call */
	saveRouteData: PropTypes.func
};

export default Map;
