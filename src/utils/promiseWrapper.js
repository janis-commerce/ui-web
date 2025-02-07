/**
 * @name promiseWrapper
 * @description return response from promise
 * @param {function} function
 * @returns promise
 * @example const [data, error] = await promiseWrapper(() => console.log('Janis'))
 * @module utils
 */
const promiseWrapper = (promise) =>
	promise.then((data) => [data, null]).catch((error) => Promise.resolve([null, error]));

export default promiseWrapper;
