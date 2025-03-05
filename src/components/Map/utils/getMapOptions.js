import { MAP_FEATURE_TYPES, DEFAULT_MAP_OPTIONS } from './constants';
import { getMapStylers } from './';

/**
 * Parses configuration for map styles and controls based on the provided options.
 * @param {boolean} showPOI Determines whether Points of Interest (POI) should be displayed on the map.
 * @param {Object} options An object specifying the options to control map display
 * @param {Object} controlsPositions An object specifying the positions of map controls.
 * @param {number} controlsPositions.zoom The position of the zoom control on the map.
 * @param {number} controlsPositions.fullScreen The position of the fullscreen control on the map.
 * @returns {Object} An object containing the parsed map options, including styles and control settings.
 */
export default (options, controlsPositions = {}) => {
	const { poi, transit } = MAP_FEATURE_TYPES;
	const hideFeaturesRules = !options.showPOI ? [poi, transit] : [];
	const mapStyleOptions = getMapStylers(hideFeaturesRules, options.poiRules);

	return {
		...DEFAULT_MAP_OPTIONS,
		...options,
		zoomControlOptions: {
			position: controlsPositions.zoom
		},
		fullscreenControlOptions: {
			position: controlsPositions.fullScreen
		},
		styles: mapStyleOptions
	};
};
