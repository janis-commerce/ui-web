import { isObject } from 'utils/isObject';

/**
 * Function to check if a value is an object with keys
 * @param {object} location Value to check if it is an object with keys
 * @returns Returns true if the value is an object with keys
 */
export default (location = {}) =>
	!!location && isObject(location) && !!Object.keys(location).length;
