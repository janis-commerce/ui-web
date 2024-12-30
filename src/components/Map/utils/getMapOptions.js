const { getMapStylers, mapFeatureTypes } = require('./utils');

/**
 * Parses configuration for map styles and controls based on the provided options.
 * @param {boolean} showPOI Determines whether Points of Interest (POI) should be displayed on the map.
 * @param {Object} controlsPositions An object specifying the positions of map controls.
 * @param {number} controlsPositions.zoom The position of the zoom control on the map.
 * @param {number} controlsPositions.fullScreen The position of the fullscreen control on the map.
 * @returns {Object} An object containing the parsed map options, including styles and control settings.
 */
const parseCoordsForPolylines = (showPOI, controlsPositions) => {
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

	return mapOptions;
};

export default parseCoordsForPolylines;
