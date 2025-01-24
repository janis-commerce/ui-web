export const LIBRARIES = ['geometry', 'drawing', 'places'];

export const INITIAL_CONTROLS_POSITION = {
	zoom: 10,
	fullScreen: 0
};

export const DIRECTIONS_URL = 'https://routes.googleapis.com/directions/v2:computeRoutes';
export const MAX_WAYPOINTS_PER_REQUEST = 25;

export const MAP_STYLERS = {
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

export const MAP_FEATURE_TYPES = {
	poi: 'poi',
	transit: 'transit',
	administrative: 'administrative',
	landscape: 'landscape',
	road: 'road',
	water: 'water',
	_default: 'poi'
};
