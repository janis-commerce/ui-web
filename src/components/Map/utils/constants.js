export const LIBRARIES = ['geometry', 'drawing', 'places'];

export const DEFAULT_CENTER = { lat: 0, lng: 0 };

export const INITIAL_CONTROLS_POSITION = {
	zoom: 13,
	fullScreen: 0
};

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

export const DEFAULT_MAP_OPTIONS = {
	mapTypeControl: false,
	streetViewControl: false,
	zoomControl: true,
	clickableIcons: false
};
