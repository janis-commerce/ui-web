/**
 * Checks if the name provided is single or compound and returns either the first two letters,
 * or the initials of the two first names.
 * @param {string} nameString
 */
const parseName = (nameString) => {
	const names = nameString.split(' ');
	return names.length > 1
		? names.reduce((accum, name, idx) => {
				if (idx <= 1) return [...accum, name.substring(0, 1)];
				return accum;
		  }, [])
		: nameString.substring(0, 2).split('');
};

/**
 * If both firstname and lastname are provided, returns an array with each of their initials.
 * If only a firstname or a lastname is provided, parses them to return either
 * their initials (if it's a compound name) or first two letters.
 * @param {string} firstname
 * @param {string} lastname
 */

const getNamesToParse = (firstname, lastname) =>
	!!firstname || !!lastname ? parseName(firstname || lastname) : null;

/**
 * If firstname or lastname (or both) are defined, will return an object with their initials and assigned color.
 * If not, returns null.
 * @param {string} firstname
 * @param {string} lastname
 */
export const getInitialsTheme = (firstname = '', lastname = '') => {
	if (!!firstname && !!lastname) return [firstname.substring(0, 1), lastname.substring(0, 1)];
	return getNamesToParse(firstname, lastname);
};
