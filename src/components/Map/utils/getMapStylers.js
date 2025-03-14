import { MAP_FEATURE_TYPES, MAP_STYLERS } from './constants';

/**
 * Returns the list of stylers based on the provided rules.
 * @param {Array} rules	Array of rules
 * @param {Array} poiRules	Array of poiRules
 * @returns Returns the list of stylers
 */
export default (rules = [], poiRules = []) => {
	const styleRules = [];
	const allRules = Array.isArray(rules) ? rules : [rules];
	const { styler, value } = MAP_STYLERS._default;

	allRules.forEach((rule) => {
		const featureType = MAP_FEATURE_TYPES[rule] || MAP_FEATURE_TYPES._default;

		if (rule === 'route') {
			styleRules.push({
				featureType: 'all',
				stylers: [{ visibility: 'on' }, { weight: 3 }]
			});
			return;
		}

		styleRules.push(...poiRules);

		const ruleObj = {
			featureType,
			stylers: [{ [styler]: value }]
		};

		styleRules.push(ruleObj);
	});

	return styleRules;
};
