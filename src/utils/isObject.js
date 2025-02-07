/**
 * Function to check if a value is an object
 * @param {*} value Value to check if it is an object
 * @returns Returns true if the value is an object
 */
export const isObject = (value) =>
	typeof value === 'object' && !Array.isArray(value) && value instanceof Object;
