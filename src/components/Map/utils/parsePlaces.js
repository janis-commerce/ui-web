import { intersection } from 'lodash';
import { findName } from './utils';

const parsePlaces = (places, parsedData) => {
	const dataTypes = ['locality', 'neighborhood', 'sublocality'];

	return places.reduce(
		(accum, result) => {
			const parsedComponents = accum;

			const { types } = result;
			const [match] = intersection(types, dataTypes);

			const name = match === 'locality' ? 'city' : 'neighborhood';

			if (types.includes(match)) return { ...parsedComponents, [name]: findName(result, match) };

			return parsedComponents;
		},
		{ ...parsedData }
	);
};

export default parsePlaces;
