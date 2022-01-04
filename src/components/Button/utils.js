import { getColor as findColorInTheme } from 'theme/utils';
import colors from 'theme/palette';

const mainPaletteColors = [
	'black',
	'primary',
	'success',
	'grey',
	'warning',
	'error',
	'white',
	'alert'
];

export const validColors = [
	'blue',
	'darkGrey',
	'grey.dark',
	'fizzGreen',
	'green',
	'lightBlue',
	'lightGrey',
	'orange',
	'red',
	'statusRed',
	'yellow',
	...mainPaletteColors
];

/**
 * Find normal, hover and pressed color
 * @param {string} color
 * @param {string} state
 * @returns {string}
 */
const findColor = (color, state) => {
	const isMainColor = mainPaletteColors.includes(color);

	const getColorState = () => {
		switch (state) {
			case 'hover':
				return isMainColor ? '.hover' : 'Hover';
			case 'pressed':
				return isMainColor ? '.pressed' : 'Pressed';
			default:
				return '';
		}
	};

	return findColorInTheme(`${color}${getColorState()}`);
};

const isValidColor = (color) => validColors.includes(color);

export const getColor = (color) => (isValidColor(color) ? findColor(color) : colors.blue);

export const getHoverColor = (color) =>
	isValidColor(color) ? findColor(color, 'hover') : colors.blueHover;

export const getPressedColor = (color) =>
	isValidColor(color) ? findColor(color, 'pressed') : colors.bluePressed;
