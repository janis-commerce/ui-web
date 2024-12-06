import { intersection } from 'lodash';
import axios from 'axios';
import { decode } from '@mapbox/polyline';

export const isObject = (value) =>
	typeof value === 'object' && !Array.isArray(value) && value instanceof Object;

const directionsURL = 'https://routes.googleapis.com/directions/v2:computeRoutes';
const maxWaypointsPerRequest = 25;

/**
 * Get places data for the provided coordinates
 * @param {lat, lng} latLng a Google latLng object
 */
const getPlaces = (latLng) =>
	new Promise((resolve) => {
		const geocoder = new window.google.maps.Geocoder();
		geocoder.geocode({ location: latLng }, (results) => resolve(results));
	});

const findName = (result, type) => {
	if (result.types.includes(type)) {
		const data = result.address_components
			? result.address_components.find((component) => component.types.includes(type))
			: result;
		return data.long_name;
	}
};

export const getDefaultMarker = () => ({
	icon: {
		url: `data:image/svg+xml;utf-8, 		<svg width="72"
		height="78"
		viewBox="0 0 60 82"
		fill="none"
		xmlns="http://www.w3.org/2000/svg"
	>
		<style>
			.iconPath {
				transform: translate(6px, 6px);
			}
			.text {
				font-family: 'Roboto', sans-serif;
				font-size: 12px;
				font-weight: 700;
				fill: white;
				line-height: 14px;
			}
		</style>
		<rect
						x="18"
						y="58"
						width="12"
						height="12"
						rx="6"
						fill="white"
					/>
					<rect
						x="21"
						y="61"
						width="6" height="6" rx="3"
						fill="%232979FF"
					/>
		<g filter="url(%23filter0_d_1140_220191)">
			<circle
				cx="24"
				cy="24"
				r="22"
				fill="none"
				stroke="%232979FF"
				stroke-width="2" 
			/>
			<rect
				x="2"
				y="2"
				width="44"
				height="44"
				rx="22"
				fill="%23FFF"
			/>
		</g>
		<g class='iconPath'>
			<path fill-rule="evenodd" clip-rule="evenodd" d="M19.0786875 6.400171875l0.9400546875-1.40503125-3.0138515625-2.0165390625-0.7163671875000001 1.070671875c-2.6634609375-1.43896875-5.900390625-1.44159375-8.565539062500001-0.006843749999999999l-0.71184375-1.0638515625-3.0138515625 2.0165390625 0.9323671874999999 1.393546875c-2.79834375 3.5361796875000002-2.57025 8.6994609375 0.6943359375 11.964046875000001 0.45227343750000004 0.45227343750000004 0.9420234375 0.8440546874999999 1.4578828125 1.1799843749999999l-1.0887421875 1.9830937499999999 0.8769609375 0.48145312500000004 1.081546875-1.9698515625c1.2699609375 0.6372656250000001 2.6580234375000003 0.9620390624999999 4.0483359375 0.9620390624999999 1.390875 0 2.779546875-0.3250078125 4.0498593750000005-0.9627656250000001l1.07953125 1.9666640625 0.8769609375-0.48145312500000004-1.0868437499999999-1.9799765625c0.515390625-0.3356953125 1.0046484375-0.727359375 1.4564765625-1.1792109375000002 3.2611171875-3.2610937499999997 3.4916953125-8.416734374999999 0.70275-11.952562499999999zM6.331007812499999 17.64571875c-3.1259765625-3.1259765625-3.1259765625-8.2119140625 0-11.337890625 1.5630000000000002-1.5630000000000002 3.6157265625-2.3442421875 5.6689453125-2.3442421875s4.10596875 0.7812421875 5.6689453125 2.3442421875c3.1259765625 3.1259765625 3.1259765625 8.2119140625 0 11.337890625s-8.2119140625 3.1259765625-11.337890625 0zM15.9384140625 14.730187500000001c-0.092296875 0.162609375-0.2617265625 0.2538984375-0.43603125 0.2538984375-0.0835078125 0-0.167484375-0.0205078125-0.24560156249999998-0.064453125l-3.9941484375-2.255859375c-0.15675-0.088875-0.2538984375-0.255375-0.2538984375-0.43553906249999996v-4.7338828125c0-0.276375 0.22364062499999998-0.49999218749999996 0.49999218749999996-0.49999218749999996s0.49999218749999996 0.22364062499999998 0.49999218749999996 0.49999218749999996v4.4418984375l3.7402265625 2.1123046875c0.2402578125 0.1362421875 0.32521875 0.44092968749999994 0.18946875 0.68165625z" fill="%232979FF" class="iconPath"/>	
		</g>
		<defs>
			<filter
				id="filter0_d_1140_220191"
				x="-6"
				y="-6"
				width="60"
				height="80"
				filterUnits="userSpaceOnUse"
				color-interpolation-filters="sRGB"
			>
				<feFlood flood-opacity="0" result="BackgroundImageFix"/>
				<feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
				<feOffset dy="4"/>
				<feGaussianBlur stdDeviation="3"/>
				<feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.292799 0"/>
				<feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_1140_220191"/>
				<feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_1140_220191" result="shape"/>
			</filter>
		</defs>
	</svg>`
	},
	zIndex: 999
});

/**
 * Gets places from the given coordinates and parses their data into friendlier values.
 * @param {lat, lng} latLng A Google latLng object.
 * @param {Array} preferredTypes Array of place types to match with the getPlaces results to increase the parsing accuracy.
 */
export const parseAddressComponents = async (latLng, preferredTypes = []) => {
	if (!latLng) return {};

	const places = await getPlaces(latLng);

	if (places && places.length) {
		/** Grab the main result according to the search result's types.
		 * If no preferredTypes are provided, set the first result as the main one. */
		const place =
			places.find((result) => !!intersection(result.types, preferredTypes).length) || places[0];

		let parsedData = {};

		/* Get most accurate data from the main result */
		if (place.address_components) {
			parsedData = place.address_components.reduce(
				(accum, component) => {
					const { long_name: name, types } = component;

					const parsedComponents = accum;

					switch (true) {
						case types.includes('country'):
							parsedComponents.country = name;
							break;
						case types.includes('street_number'):
							parsedComponents.number = name;
							break;
						case types.includes('administrative_area_level_1'):
							parsedComponents.state = name;
							break;
						case types.includes('route'):
							parsedComponents.street = name;
							break;
						case types.includes('postal_code'):
							parsedComponents.postalCode = name;
							break;
						default:
							break;
					}

					return parsedComponents;
				},
				{ formattedAddress: place.formatted_address }
			);
		}

		/* Go deeper to find the right city and neighborhood values */
		if (places.length) {
			const dataTypes = ['locality', 'neighborhood', 'sublocality'];

			return places.reduce(
				(accum, result) => {
					const parsedComponents = accum;

					const { types } = result;
					const [match] = intersection(types, dataTypes);

					const name = match === 'locality' ? 'city' : 'neighborhood';

					if (types.includes(match))
						return { ...parsedComponents, [name]: findName(result, match) };

					return parsedComponents;
				},
				{ ...parsedData }
			);
		}
	}
};

// Map styles format
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

const formatCoordinates = (latitude, longitude) => {
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
		.map((waypoint) =>
			waypoint.lng && waypoint.lat ? formatCoordinates(waypoint.lat, waypoint.lng) : null
		)
		.filter(Boolean);
};

/**

Retrieves the polyline directions from Google Maps API based on the provided parameters.

@param {Object} params - An object containing the parameters for the API request.
@returns {Promise<Array<Object>>} - A Promise that resolves to an array of coordinates.

@throws {Error} - If params is not a valid object or any of its properties are not valid.

*/
export const getPolylineDirections = async (params = {}) => {
	try {
		if (!params || !isObject(params) || !Object.keys(params).length)
			throw new Error('params is not a valid object');
		const {
			coordinates: { origin, destination },
			googleMapsApiKey,
			waypoints
		} = params;

		const allWaypoints = [
			formatCoordinates(origin.lat, origin.lng),
			...createLatLngObjectsFromArray(waypoints),
			formatCoordinates(destination.lat, destination.lng)
		];

		const numRequests = Math.ceil(allWaypoints.length / maxWaypointsPerRequest);
		let allCoords = [];
		let route = {};

		for (let i = 0; i < numRequests; i++) {
			const startIndex = i * maxWaypointsPerRequest;
			const endIndex = Math.min(startIndex + maxWaypointsPerRequest, allWaypoints.length);
			let waypointsSubset = allWaypoints.slice(startIndex, endIndex);

			waypointsSubset = [
				waypointsSubset[0],
				...waypointsSubset.slice(1, -1),
				waypointsSubset[waypointsSubset.length - 1]
			];

			const body = {
				origin: waypointsSubset[0],
				destination: waypointsSubset[waypointsSubset.length - 1],
				intermediates: waypointsSubset.slice(1, -1),
				travelMode: 'drive',
				routingPreference: 'traffic_unaware',
				polylineQuality: 'high_quality',
				computeAlternativeRoutes: false,
				routeModifiers: {
					avoidTolls: false,
					avoidHighways: false,
					avoidFerries: false,
					avoidIndoor: false
				}
			};
			const header = {
				headers: {
					'content-type': 'application/json',
					'x-goog-api-key': googleMapsApiKey,
					'x-goog-fieldmask': '*'
				}
			};
			// eslint-disable-next-line no-await-in-loop
			const { data } = await axios.post(directionsURL, body, header);
			const points = decode(data.routes[0].polyline.encodedPolyline);
			const coords = points.map((point) => ({
				lat: point[0],
				lng: point[1]
			}));

			allCoords = allCoords.concat(coords);
			// eslint-disable-next-line prefer-destructuring
			route = data.routes[0];
		}

		return { allCoords, route };
	} catch (reason) {
		return Promise.reject(reason?.response?.data || reason);
	}
};

/**
 *
 * @param {object} lock
 * @returns {boolean}
 */
export const validLock = (lock) => !!lock && isObject(lock) && !!Object.keys(lock).length;

/**
 * takes an array of coordinates with it's type, and parses it into valid coordinates to draw a polyline
 *
 * @param {array} coords
 * @return {object} of coordinates to draw polylines
 */
export const parseCoordsForPolylines = (coords) => {
	if (!coords || !Array.isArray(coords) || !coords.length) return {};

	const origin = coords[0].position;
	const destination = coords[coords.length - 1].position;

	const validPickupLoc = validLock(origin);
	const validDestinationLoc = validLock(destination);

	if (!validPickupLoc || !validDestinationLoc) return {};

	const coordinate = { origin, destination };

	return coordinate;
};

const parseProp = (prop) => (typeof prop === 'object' ? prop : { icon: prop });

export const addOriginAndDestination = (originMarker, destinationMarker, index, markersArray) => {
	const destinationValidation =
		index === markersArray.length - 1 ? { ...parseProp(destinationMarker) } : {};
	const markerProps = index === 0 ? { ...parseProp(originMarker) } : destinationValidation;

	return markerProps;
};

export const findSelectedPosition = (selectedRows, marker) => {
	const index =
		marker.type === 'warehouse'
			? selectedRows.indexOf(marker.id)
			: selectedRows.indexOf(marker.shippingId);
	return index !== -1 ? index + 1 : null;
};

/**
 * @function validateCoordinates
 * @description return true or false is region has latitude and longitude keys and type number
 * @param {object} region - object with latitude and longitude
 * @param {number} region.lng - longitude
 * @param {number} region.lat - latitude
 * @returns {boolean}
 * @example isValidRegionData({latitude: -345345, longitude: -345435345}) => true
 * @example isValidRegionData({latitude: -345345, longitude: '3453453453'}) => false
 * @example isValidRegionData({latitude: -345345}) => false
 */
export const validateCoordinates = (region) => {
	console.log({region});
	if (!region || !isObject(region) || !Object.keys(region).length) return false;

	if (!('lng' in region.position) || !('lat' in region.position)) return false;

	const { lng, lat } = region.position;

	if (Number.isNaN(lng) || Number.isNaN(lat)) return false;

	return true;
};

/**
 * @name promiseWrapper
 * @description return response from promise
 * @param {function} function
 * @returns promise
 * @example const [data, error] = await promiseWrapper(() => console.log('Janis'))
 * @module utils
 */
export const promiseWrapper = (promise) =>
	promise.then((data) => [data, null]).catch((error) => Promise.resolve([null, error]));

/* Maps every marker to extend the map's bounds so they can all be initially shown */
export const getBounds = (markers) => {
	console.log({ ...markers });
	const bounds = new window.google.maps.LatLngBounds();
	markers.map((marker) => {
		const { lat, lng } = marker;
		return bounds.extend(new window.google.maps.LatLng(lat, lng));
	});

	return bounds;
};

/* If there are several markers, updates the map's bounds to show them all, otherwise, the map keeps its original position */
export const showAllMarkers = (map, markers, centerCoordinate) => {
	if (markers.length) {
		const markersFlatted = markers.flatMap((marker) =>
			marker.points.map((point) => point.position)
		);
		console.log({ markersFlatted });
		map.fitBounds(getBounds(markersFlatted));
		map.setCenter(centerCoordinate);
	}

	return null;
};
