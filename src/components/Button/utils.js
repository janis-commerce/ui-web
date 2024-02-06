import { css } from 'styled-components';
import { findColorInPalette } from 'theme/utils';
import colors from 'theme/palette';

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

const { white, grey, lightGreyHover, lightGrey, blue, blueHover, bluePressed } = colors;

const isValidColor = (color) => validColors.includes(color);
export const getColor = (color) => (isValidColor(color) ? colors[color] : blue);

export const getHoverColor = (color) => (isValidColor(color) ? colors[`${color}Hover`] : blueHover);

export const getPressedColor = (color) =>
	isValidColor(color) ? colors[`${color}Pressed`] : bluePressed;

const commonStyles = (color) => css`
	color: ${getColor(color)};
	&.button-icon {
		fill: ${getColor(color)};
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
			color: ${fontColor ? findColorInPalette(fontColor) : white};
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
		outlined: () => commonStyles(color),
		cleaned: () => commonStyles(color)
	};

	return variantStyles[variant] || '';
};
