import styled, { css } from 'styled-components';
import { getColor, timingFunctions } from 'theme/utils';
import mixins from 'theme/mixins';
import { isValidColor } from './utils';
import viewsPalette from 'theme/palette';

const { white, grey, lightGreyHover, lightGrey, blue, blueHover, bluePressed } = viewsPalette;

export const getBtnColor = (color) => (isValidColor(color) ? viewsPalette[color] : blue);

export const getHoverColor = (color) =>
	isValidColor(color) ? viewsPalette[`${color}Hover`] : blueHover;

export const getPressedColor = (color) =>
	isValidColor(color) ? viewsPalette[`${color}Pressed`] : bluePressed;

const commonStyles = (iconColor, fontColor, color) => css`
	color: ${getColor(fontColor || color || blue)};
	.button-icon {
		fill: ${getColor(iconColor || color || blue)};
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

const getButtonStyles = ({ fontColor, color, variant, iconColor }) => {
	const variantStyles = {
		contained: () => css`
			color: ${getColor(fontColor || 'white')};
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
			border: 1px solid ${getColor(grey)};
		`,
		cleaned: () => commonStyles(iconColor, fontColor, color)
	};

	return variantStyles[variant] || '';
};

export default {
	Button: styled.button`
		display: flex;
		align-items: center;
		justify-content: center;
		height: 36px;
		width: ${({ rounded }) => rounded && '36px'};
		flex-shrink: ${({ rounded }) => (rounded ? '0' : 'initial')};
		border-radius: ${({ rounded }) => (rounded ? '50%' : '50px')};
		padding: ${({ rounded, hasText, hasIcon }) =>
			!rounded && (hasText && hasIcon ? '0 12px' : '0 16px')};
		cursor: ${({ disabled }) => (disabled ? 'default' : 'pointer')};
		border: none;
		font-size: 13px;
		font-weight: 500;
		position: relative;
		${mixins.transition('background-color', '250ms')};
		z-index: 0;
		&:before {
			content: '';
			border-radius: 50px;
			position: absolute;
			left: 0;
			top: 0;
			z-index: -1;
			width: 100%;
			height: 100%;
		}
		&:after {
			content: '';
			border-radius: 50px;
			position: absolute;
			z-index: -1;
			width: 100%;
			height: 100%;
			transition: all 0.25s ${timingFunctions.standard};
			transform: scale(0, 0);
			top: 0;
			bottom: 0;
			left: 0;
			right: 0;
		}

		&:focus:after,
		&:hover:after,
		&:active:after {
			transform: scale(1, 1);
		}
		&:active {
			-webkit-tap-highlight-color: ${viewsPalette.transparentWhite};
		}

		.button-icon {
			margin-right: ${({ hasText }) => hasText && '8px'};
			fill: ${viewsPalette.white};
			${mixins.transition('fill', '250ms')};
		}
		&:disabled {
			&:hover {
				background-color: transparent;
			}
		}
		${getButtonStyles}
		.button-icon {
			fill: ${({ iconColor }) => getColor(iconColor)};
		}
		${({ styles }) => styles};
	`
};
