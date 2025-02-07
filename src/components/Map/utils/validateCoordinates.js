import { isNumber } from 'lodash';
import { isObject } from 'utils/isObject';

/**
 * @function validateCoordinates
 * @description return true or false is region has latitude and longitude keys and type number
 * @param {object} coordinates - object with latitude and longitude
 * @param {number} coordinates.lng - longitude
 * @param {number} coordinates.lat - latitude
 * @returns {boolean}
 * @example isValidRegionData({latitude: -345345, longitude: -345435345}) => true
 * @example isValidRegionData({latitude: -345345, longitude: '3453453453'}) => false
 * @example isValidRegionData({latitude: -345345}) => false
 */
export default (coordinates = {}) => {
	if (!isObject(coordinates) || !Object.keys(coordinates).length) return false;

	const { lng, lat } = coordinates;

	if (!lng || !lat) return false;

	if (!isNumber(lng) || !isNumber(lat)) return false;

	return true;
};
