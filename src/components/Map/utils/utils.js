import { intersection } from 'lodash';
import getParsedComponents from './getParsedComponents';
import parsePlaces from './parsePlaces';

export const isObject = (value) =>
	typeof value === 'object' && !Array.isArray(value) && value instanceof Object;

/**
 * Get places data for the provided coordinates
 * @param {lat, lng} latLng a Google latLng object
 */
const getPlaces = (latLng) =>
	new Promise((resolve) => {
		const geocoder = new window.google.maps.Geocoder();
		geocoder.geocode({ location: latLng }, (results) => resolve(results));
	});

export const findName = (result, type) => {
	if (!result.types.includes(type)) return null;

	const data = result.address_components
		? result.address_components.find((component) => component.types.includes(type))
		: result;

	return data.long_name;
};

/**
 * Gets places from the given coordinates and parses their data into friendlier values.
 * @param {lat, lng} latLng A Google latLng object.
 * @param {Array} preferredTypes Array of place types to match with the getPlaces results to increase the parsing accuracy.
 */
export const parseAddressComponents = async (latLng, preferredTypes = []) => {
	if (!latLng) return {};

	const places = await getPlaces(latLng);

	if (!places || !places.length) return {};
	/** Grab the main result according to the search result's types.
	 * If no preferredTypes are provided, set the first result as the main one. */
	const place =
		places.find((result) => !!intersection(result.types, preferredTypes).length) || places[0];

	let parsedData = {};

	/* Get most accurate data from the main result */
	if (place.address_components) {
		parsedData = getParsedComponents(place);
	}

	/* Go deeper to find the right city and neighborhood values */
	if (places.length) {
		return parsePlaces(places, parsedData);
	}
};

const mapStylers = {
	visibility: {
		on: 'on',
		off: 'off',
		simplified: 'simplified'
	},
	_default: {
		styler: 'visibility',
		value: 'off'
	}
};

export const mapFeatureTypes = {
	poi: 'poi',
	transit: 'transit',
	administrative: 'administrative',
	landscape: 'landscape',
	road: 'road',
	water: 'water',
	_default: 'poi'
};

export const getMapStylers = (rules) => {
	if (!rules) return [];

	const styleRules = [];
	const allRules = Array.isArray(rules) ? rules : [rules];

	allRules.forEach((rule) => {
		const featureType = mapFeatureTypes[rule] || mapFeatureTypes._default; // eslint-disable-line no-underscore-dangle
		const { styler, value } = mapStylers._default; // eslint-disable-line no-underscore-dangle

		const ruleObj = {
			featureType,
			stylers: [{ [styler]: value }]
		};

		styleRules.push(ruleObj);
	});

	return styleRules;
};

export const formatCoordinates = (latitude, longitude) => {
	if (!latitude || !longitude) return null;
	const direction = {
		vehicleStopover: false,
		sideOfRoad: false,
		location: {
			latLng: {
				latitude,
				longitude
			}
		}
	};
	return direction;
};

/**
 * takes an array of waypoints and returns them parsed
 *
 * @param {array} waypoints
 * @return {array}
 */
export const createLatLngObjectsFromArray = (waypoints) => {
	if (!waypoints || !Array.isArray(waypoints) || !waypoints.length) return [];

	return waypoints
		.map((waypoint) => formatCoordinates(waypoint.position.lat, waypoint.position.lng))
		.filter(Boolean);
};

/**
 *
 * @param {object} location
 * @returns {boolean}
 */
export const validLocation = (location) =>
	!!location && isObject(location) && !!Object.keys(location).length;

const parseProp = (prop) => (typeof prop === 'object' ? prop : { icon: prop });

export const addOriginAndDestination = (originMarker, destinationMarker, index, markersArray) => {
	const destinationValidation =
		index === markersArray.length - 1 ? { ...parseProp(destinationMarker) } : {};
	const markerProps = index === 0 ? { ...parseProp(originMarker) } : destinationValidation;

	return markerProps;
};

export const findSelectedPosition = (selectedRows, marker) => {
	const { id, shippingId, type } = marker;
	const index = selectedRows.indexOf(type === 'warehouse' ? id : shippingId);
	return index !== -1 ? index + 1 : null;
};

/* Maps every marker to extend the map's bounds so they can all be initially shown */
export const getBounds = (markers) => {
	const bounds = new window.google.maps.LatLngBounds();
	markers.map(({ lat, lng }) => {
		return bounds.extend(new window.google.maps.LatLng(lat, lng));
	});

	return bounds;
};

/* If there are several markers, updates the map's bounds to show them all, otherwise, the map keeps its original position */
export const showAllMarkers = (map, markers, centerCoordinate) => {
	if (!markers.length) return;
	const markersFlatted = markers.flatMap((marker) => marker.points.map((point) => point.position));
	map.fitBounds(getBounds(markersFlatted));
	map.setCenter(centerCoordinate);

	return null;
};
