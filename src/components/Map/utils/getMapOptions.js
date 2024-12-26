const { getMapStylers, mapFeatureTypes } = require('./utils');

export const getMapOptions = (showPOI, controlsPositions) => {
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
