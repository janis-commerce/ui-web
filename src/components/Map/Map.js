import React, { useState, useRef, useEffect } from 'react';
import { GoogleMap, useJsApiLoader, Polyline } from '@react-google-maps/api';
import PropTypes from 'prop-types';
import Marker from './components/Marker';
import {
	getBounds,
	getDefaultMarker,
	getMapStylers,
	getPolylineDirections,
	mapFeatureTypes,
	parseAddressComponents,
	parseCoordsForPolylines,
	promiseWrapper,
	showAllMarkers,
	validateCoordinates
} from './utils';
import { getDefaultSvgTemplate } from './components/Marker/utils';
import viewsPalette from 'theme/palette';
import MarkerDrawer from './components/MarkersDrawer';

const libraries = ['geometry', 'drawing', 'places'];

const initialControlsPosition = {
	zoom: 10,
	fullScreen: 0
};

const Map = ({
	googleMapsApiKey,
	height,
	width, //agregar clases para poder estilizar
	center, //se usa auto cunaod no hay markers
	showSearchBar,
	markers,
	readOnly = false,
	updateMarkerCallback,
	canAddMarkers = true, //puede ser que solo funcione cuando este vacio el mapa
	canDragMarkers = true, // puede ser que solo funcoine cuando
	maxMarkersQuantity = 1,
	saveRouteData,
	showPOI
}) => {
	//validaciones para verificar todas las props y que no rompa
	/* For map viewport position */
	const [coordinates, setCoords] = useState({ lat: 0, lng: 0 });
	/* Markers data */
	//const [markersLocal, setMarkersLocal] = useState([]);
	const [polylines, setPolylines] = useState([]);
	const { isLoaded } = useJsApiLoader({
		googleMapsApiKey,
		libraries
	});

	const mapCenter = markers.length === 0 ? { center: coordinates } : {};

	const mapRef = useRef();
	const [firstLoad, setFirstLoad] = useState(false);
	const [mapState, setMapState] = useState('');

	const [controlsPositions, setControlsPositions] = useState(initialControlsPosition);

	const handlePositions = (key, value) => {
		console.log({ key, value });
		setControlsPositions((prev) => ({ ...prev, [key]: value }));
	};

	const { poi, transit } = mapFeatureTypes;
	const hideFeaturesRules = !showPOI && [poi, transit];
	const mapStyleOptions = getMapStylers(hideFeaturesRules);

	const mapOptions = {
		mapTypeControl: false,
		streetViewControl: false,
		zoomControl: true,
		zoomControlOptions: {
			position: controlsPositions.zoom
		},
		fullscreenControlOptions: {
			position: controlsPositions.fullScreen
		},
		clickableIcons: false,
		styles: mapStyleOptions
	};

	const setCoordinatesForGeolocation = () => {
		navigator.geolocation.getCurrentPosition((pos) => {
			const {
				coords: { latitude, longitude }
			} = pos;

			setCoords({ lat: latitude, lng: longitude });
		});
	};

	const getDirections = async () => {
		const directionPromises = markers.map(async (marker) => {
			console.log({ marker });
			if (marker.drawRoute) {
				if (saveRouteData) saveRouteData(null);
				return [];
			}
			const validCoordinates =
				Array.isArray(marker.points) &&
				marker.points.filter((coord) => validateCoordinates(coord)).filter(Boolean);
			const waypoints = validCoordinates?.length > 2 ? validCoordinates.slice(1, -1) : [];
			console.log({ validCoordinates });
			const parsedCoords = parseCoordsForPolylines(validCoordinates);
			const [validDirections, directionsError] = await promiseWrapper(
				getPolylineDirections({
					coordinates: parsedCoords,
					googleMapsApiKey,
					waypoints
				})
			);
			if (directionsError) return directionsError;

			const { allCoords, route } = validDirections;

			if (saveRouteData) saveRouteData(route);

			return allCoords;
		});

		const polylines = await Promise.all(directionPromises);

		return setPolylines(polylines);
	};

	useEffect(() => {
		/* Set initial map position */
		if (!markers.length) return setCoords({ lat: center.lat, lng: center.lng });
		setCoordinatesForGeolocation();
		console.log('adsasdasdasd', { markers });
		if (!markers.length) return;
		getDirections();
	}, []);

	const updateMarker = (marker, idx) => {
		/* Update map position */
		setCoords(marker);

		const multipleEditableMarkers = canAddMarkers || canDragMarkers || maxMarkersQuantity > 1;

		if (!multipleEditableMarkers) {
			markers[0] = marker;
		}
		//const canAddMarker =
		//const replaceLastMarker = {return}; //reemplaza el ultimo

		if (multipleEditableMarkers) {
			/** Adding markers */
			if (typeof idx === 'undefined') {
				/* If the maximum markers allowed quantity has been reached, remove the oldest one
				(only when route drawing is not allowed) */
				if (markers.length === maxMarkersQuantity && !drawRoute) markers.shift();

				markers.push(marker);
			} else {
				/* Update existing markers */
				markers[idx] = marker;
			}
		}

		//setMarkersLocal([...markers]);

		if (updateMarkerCallback) updateMarkerCallback(markers);
	};

	const setMarker = async (latLng = {}, idx, markerData = {}) => {
		console.log({ latLng, idx, markerData });
		/* If a single marker empty map already got its marker.
			(maxMarkersQuantity is defined, as 1, and there's one marker already) */
		const singleMarkerAlreadyAdded =
			maxMarkersQuantity && maxMarkersQuantity === 1 && !!markers.length;
		const preventMarkerCreation = !canAddMarkers || singleMarkerAlreadyAdded;
		/* Rejects adding a new marker if it shouldn't be allowed
			(or repositioning a single marker by clicking on the map) */
		if (typeof idx === 'undefined' && preventMarkerCreation) return null;
		const addressData = await parseAddressComponents(latLng);
		//if (!addressData) return null;
		//const { formattedAddress, ...addressComponents } = addressData;
		const { lat, lng } = latLng;
		return updateMarker(
			{
				...markerData,
				lat: lat(),
				lng: lng(),
				//addressComponents,
				//formattedAddress
				...(markerData.icon || { icon: getDefaultSvgTemplate(viewsPalette.black, {}) }),
				...(markerData.zIndex || { zIndex: getDefaultMarker().zIndex })
			},
			idx
		);
	};

	const onLoad = (map) => {
		console.log({ map });
		if (map) {
			mapRef.current = map;
			console.log({ mapRef });
			setMapState(mapRef);
			//meter state pa que actualice

			const fullScreenPos = showSearchBar ? 'RIGHT_BOTTOM' : 'RIGHT_TOP';
			handlePositions('fullScreen', window.google.maps.ControlPosition[fullScreenPos]);
			handlePositions('zoom', window.google.maps.ControlPosition.RIGHT_BOTTOM);
			/** Set the marker's additional data on load */
			if (!markers.length) return;
			showAllMarkers(map, markers);
			//const [firstMarker] = markers;
			//if (firstMarker.formattedAddress) return;
			//const { lat, lng } = firstMarker;
			//setMarker(new window.google.maps.LatLng(lat, lng), 0, firstMarker);
		}
	};

	// console.log({ mapOptions, polylines });

	useEffect(() => {
		console.log({ mapRef, noentra: !mapRef || !mapRef.current });
		console.log({ entra: !!markers.length && !firstLoad, markers });
		console.log({ markers });
		if (!mapRef || !mapRef.current) return;
		if (!!markers.length && !firstLoad) {
			const centerCoordinate = !markers.length ? center : getBounds(markers).getCenter();
			console.log({ centerCoordinate });
			showAllMarkers(mapRef.current, markers, centerCoordinate);
			if (!markers.length) mapRef.current.setZoom(13);
			setFirstLoad(true);
		}
	}, [markers, mapState, center]);

	console.log({ polylines });

	return isLoaded ? (
		<GoogleMap
			onLoad={(map) => onLoad(map)}
			mapContainerStyle={{ height, width }}
			options={mapOptions}
			onClick={({ latLng }) => setMarker(latLng)}
			{...mapCenter}
		>
			<MarkerDrawer markers={markers} readOnly={readOnly} setMarker={setMarker} />
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
			points: PropTypes.arrayOf({ lat: PropTypes.number, lng: PropTypes.number })
		})
	), //
	/** Coords for centering map */
	coordinates: PropTypes.shape({ lat: PropTypes.number, lng: PropTypes.number }),
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
	/** Custom marker props */
	markerProps: PropTypes.shape({}),
	/** Determines if markers can be draggable. If `showSearchBar` or `canAddMarkers` are enabled,
	 * this prop will always evaluate to true.
	 */
	canDragMarkers: PropTypes.bool,
	/** Enables points of interest on the map */
	showPOI: PropTypes.bool,
	center: PropTypes.shape({ lat: PropTypes.number, lng: PropTypes.number }),
	withInteraction: PropTypes.bool,
	googleMapsApiKey: PropTypes.string,
	saveRouteData: PropTypes.func
};

export default Map;
