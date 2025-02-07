/**
 * Format coordinates to be used in the map
 * @param {number} latitude Value of the latitude
 * @param {number} longitude Value of the longitude
 * @returns Returns the formatted coordinates
 */
export default (latitude, longitude) => {
	if (!latitude || !longitude) return null;

	return {
		vehicleStopover: false,
		sideOfRoad: false,
		location: {
			latLng: {
				latitude,
				longitude
			}
		}
	};
};
