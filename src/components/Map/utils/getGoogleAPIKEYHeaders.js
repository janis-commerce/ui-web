const getGoogleHeaders = (apiKey) => {
	return {
		headers: {
			'content-type': 'application/json',
			'x-goog-api-key': apiKey,
			'x-goog-fieldmask': '*'
		}
	};
};

export default getGoogleHeaders;
