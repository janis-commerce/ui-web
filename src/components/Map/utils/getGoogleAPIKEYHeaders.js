/**
 * Function to get the headers for the Google API Key
 * @param {string} apiKey String with the API key
 * @returns Returns the headers for the Google API Key
 */
export default (apiKey = '') => {
	return {
		headers: {
			'content-type': 'application/json',
			'x-goog-api-key': apiKey,
			'x-goog-fieldmask': '*'
		}
	};
};
