export const LIBRARIES = ['geometry', 'drawing', 'places'];

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
