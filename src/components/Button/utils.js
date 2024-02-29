import { css } from 'styled-components';
import { getColor as findColorInTheme } from 'theme/utils';
import viewsPalette from 'theme/palette';

export const validColors = [
	'black',
	'blue',
	'darkGrey',
	'fizzGreen',
	'green',
	'grey',
	'lightBlue',
	'lightGrey',
	'orange',
	'red',
	'statusRed',
	'white',
	'yellow'
];

const { white, grey, lightGreyHover, lightGrey, blue, blueHover, bluePressed } = viewsPalette;

const isValidColor = (color) => validColors.includes(color);
export const getColor = (color) => (isValidColor(color) ? viewsPalette[color] : blue);

export const getHoverColor = (color) =>
	isValidColor(color) ? viewsPalette[`${color}Hover`] : blueHover;

export const getPressedColor = (color) =>
	isValidColor(color) ? viewsPalette[`${color}Pressed`] : bluePressed;

const commonStyles = (iconColor, fontColor, color) => css`
	color: ${findColorInTheme(fontColor || color || blue)};
	.button-icon {
		fill: ${findColorInTheme(iconColor || color || blue)};
	}
	background: none;
	&:focus,
	&:hover {
		background-color: ${lightGreyHover};
	}
	&:active {
		background-color: ${lightGrey};
	}
	&:disabled {
		color: ${grey};
		.button-icon {
			fill: ${grey};
		}
	}
`;

export const getButtonStyles = ({ fontColor, color, variant, iconColor }) => {
	const variantStyles = {
		contained: () => css`
			color: ${findColorInTheme(fontColor || 'white')};
			&:before {
				background-color: ${findColorInTheme(color)};
			}
			.button-icon {
				fill: ${white};
			}
			&:focus:after,
			&:hover:after {
				background-color: ${getHoverColor(color)};
			}
			&:active {
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
			${commonStyles(iconColor, fontColor, color)};
			border: 1px solid ${findColorInTheme(grey)};
		`,
		cleaned: () => commonStyles(iconColor, fontColor, color)
	};

	return variantStyles[variant] || '';
};
