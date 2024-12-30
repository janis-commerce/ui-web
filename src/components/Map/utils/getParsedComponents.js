const getParsedComponents = (place) => {
	return place.address_components.reduce(
		(accum, component) => {
			const { long_name: name, types } = component;

			const parsedComponents = accum;

			switch (true) {
				case types.includes('country'):
					parsedComponents.country = name;
					break;
				case types.includes('street_number'):
					parsedComponents.number = name;
					break;
				case types.includes('administrative_area_level_1'):
					parsedComponents.state = name;
					break;
				case types.includes('route'):
					parsedComponents.street = name;
					break;
				case types.includes('postal_code'):
					parsedComponents.postalCode = name;
					break;
				default:
					break;
			}

			return parsedComponents;
		},
		{ formattedAddress: place.formatted_address }
	);
};

export default getParsedComponents;
