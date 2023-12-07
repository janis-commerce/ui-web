import styled, { css } from 'styled-components';
import { getColor as findColorInTheme, timingFunctions } from 'theme/utils';
import mixins from 'theme/mixins';
import colors from 'theme/palette';
import { getColor, getHoverColor, getPressedColor } from './utils';

export default {
	Button: styled.button`
		display: flex;
		align-items: center;
		justify-content: center;
		height: 36px;
		width: ${(props) => props.rounded && '36px'};
		flex-shrink: ${(props) => (props.rounded ? '0' : 'initial')};
		border-radius: ${(props) => (props.rounded ? '50%' : '50px')};
		padding: ${(props) => !props.rounded && (props.hasText && props.hasIcon ? '0 12px' : '0 16px')};
		cursor: ${(props) => (props.disabled ? 'default' : 'pointer')};
		border: ${(props) =>
			props.variant === 'outlined' ? `1px solid ${findColorInTheme('grey')}` : 'none'};
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
			-webkit-tap-highlight-color: ${colors.transparentWhite};
		}

		.button-icon {
			margin-right: ${(props) => props.hasText && '8px'};
			fill: ${colors.white};
			${mixins.transition('fill', '250ms')};
		}

		${(props) => {
			switch (props.variant) {
				case 'contained':
					return css`
						color: ${findColorInTheme(props.fontColor)};
						&:before {
							background-color: ${getColor(props.color)};
						}

						.button-icon {
							fill: ${colors.white};
						}

						&:focus:after,
						&:hover:after {
							background-color: ${getHoverColor(props.color)};
						}

						&:active:after {
							background-color: ${getPressedColor(props.color)};
						}

						&:disabled {
							&:before,
							&:after {
								background-color: ${colors.grey};
							}
						}
					`;
				case 'outlined':
				case 'cleaned':
					return css`
						color: ${getColor(props.color)};
						&:after {
							background-color: transparent;
						}

						.button-icon {
							fill: ${getColor(props.color)};
						}

						&:focus:after,
						&:hover:after {
							background-color: ${colors.lightGreyHover};
						}

						&:active:after {
							background-color: ${colors.lightGrey};
						}

						&:disabled {
							color: ${colors.grey};
							&:after {
								background-color: transparent;
							}

							.button-icon {
								fill: ${colors.grey};
							}
						}
					`;
				default:
					return '';
			}
		}};

		.button-icon {
			fill: ${(props) => findColorInTheme(props.iconColor)};
		}

		${(props) => props.styles};
	`,
	Children: styled.div``
};
