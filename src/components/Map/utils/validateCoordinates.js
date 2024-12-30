import { isNumber } from 'lodash';
import { isObject } from './utils';

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
const validateCoordinates = (region) => {
	if (!region || !isObject(region) || !Object.keys(region).length) return false;

	const { lng, lat } = region;

	if (!lng || !lat) return false;

	if (!isNumber(lng) || !isNumber(lat)) return false;

	return true;
};

export default validateCoordinates;
