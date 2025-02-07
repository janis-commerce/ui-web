import { MAP_FEATURE_TYPES } from './constants';
import { getMapStylers } from './';

/**
 * Parses configuration for map styles and controls based on the provided options.
 * @param {boolean} showPOI Determines whether Points of Interest (POI) should be displayed on the map.
 * @param {Object} controlsPositions An object specifying the positions of map controls.
 * @param {number} controlsPositions.zoom The position of the zoom control on the map.
 * @param {number} controlsPositions.fullScreen The position of the fullscreen control on the map.
 * @returns {Object} An object containing the parsed map options, including styles and control settings.
 */
export default (showPOI = false, controlsPositions = {}) => {
	const { poi, transit } = MAP_FEATURE_TYPES;
	const hideFeaturesRules = !showPOI && [poi, transit];
	const mapStyleOptions = getMapStylers(hideFeaturesRules);

	return {
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
};
