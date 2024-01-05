import { css } from 'styled-components';
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

const { white, grey, lightGreyHover, lightGrey, blue, blueHover, bluePressed } = colors;

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

export const getColor = (color) => (isValidColor(color) ? findColor(color) : blue);

export const getHoverColor = (color) =>
	isValidColor(color) ? findColor(color, 'hover') : blueHover;

export const getPressedColor = (color) =>
	isValidColor(color) ? findColor(color, 'pressed') : bluePressed;

export const getButtonStyles = ({ fontColor, color, variant }) => {
	const variantStyles = {
		contained: () => css`
			color: ${findColorInTheme(fontColor)};
			&:before {
				background-color: ${getColor(color)};
			}
			.button-icon {
				fill: ${white};
			}
			&:focus:after,
			&:hover:after {
				background-color: ${getHoverColor(color)};
			}
			&:active:after {
				background-color: ${getPressedColor(color)};
			}
			&:disabled {
				&:before,
				&:after {
					background-color: ${grey};
				}
			}
		`,
		outlined: () => css`
			color: ${getColor(color)};
			&:after {
				background-color: transparent;
			}
			.button-icon {
				fill: ${getColor(color)};
			}
			&:focus:after,
			&:hover:after {
				background-color: ${lightGreyHover};
			}
			&:active:after {
				background-color: ${lightGrey};
			}
			&:disabled {
				color: ${grey};
				&:after {
					background-color: transparent;
				}
				.button-icon {
					fill: ${grey};
				}
			}
		`,
		cleaned: () => css`
			color: ${getColor(color)};
			&:after {
				background-color: transparent;
			}

			.button-icon {
				fill: ${getColor(color)};
			}

			&:focus:after,
			&:hover:after {
				background-color: ${lightGreyHover};
			}

			&:active:after {
				background-color: ${lightGrey};
			}

			&:disabled {
				color: ${grey};
				&:after {
					background-color: transparent;
				}

				.button-icon {
					fill: ${grey};
				}
			}
		`
	};

	return variantStyles[variant] || '';
};
