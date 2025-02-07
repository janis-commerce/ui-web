import { MAP_FEATURE_TYPES, MAP_STYLERS } from './constants';

/**
 * Returns the list of stylers based on the provided rules.
 * @param {Array} rules	Array of rules
 * @returns Returns the list of stylers
 */
export default (rules = []) => {
	const styleRules = [];
	const allRules = Array.isArray(rules) ? rules : [rules];

	allRules.forEach((rule) => {
		const featureType = MAP_FEATURE_TYPES[rule] || MAP_FEATURE_TYPES._default; // eslint-disable-line no-underscore-dangle
		const { styler, value } = MAP_STYLERS._default; // eslint-disable-line no-underscore-dangle

		const ruleObj = {
			featureType,
			stylers: [{ [styler]: value }]
		};

		styleRules.push(ruleObj);
	});

	return styleRules;
};
