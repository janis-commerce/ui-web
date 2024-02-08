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

const commonStyles = (color) => css`
	color: ${findColorInTheme(color)};
	.button-icon {
		fill: ${findColorInTheme(color)};
	}
	&:after {
		background-color: transparent;
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
`;

export const getButtonStyles = ({ fontColor, color, variant }) => {
	const variantStyles = {
		contained: () => css`
			color: ${fontColor ? findColorInTheme(fontColor) : white};
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
			${commonStyles(color)};
			border: 1px solid ${findColorInTheme(grey)};
		`,
		cleaned: () => commonStyles(color)
	};

	return variantStyles[variant] || '';
};
