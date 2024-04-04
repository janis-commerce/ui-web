import viewsPalette from 'theme/palette';

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
 * Assigns a color to the names or initials array provided.
 * @param {array} name - Array containing the firstname and lastname strings
 */
export const getUserColor = (name) => {
	const availableColors = Object.keys(viewsPalette);

	const availableIndexes = availableColors.length;

	const charCodes = [...name].map((letter) => letter.charCodeAt(0));

	const len = charCodes.length;

	const a = (len % (availableIndexes - 1)) + 1;
	const c = charCodes.reduce((current, next) => current + next) % availableIndexes;

	let random = charCodes[0] % availableIndexes;
	for (let i = 0; i < len; i++) random = (a * random + c) % availableIndexes;

	const userColor = availableColors[random];

	return viewsPalette[userColor];
};

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
