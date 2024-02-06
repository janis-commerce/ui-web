import styled from 'styled-components';
import { findColorInPalette, timingFunctions } from 'theme/utils';
import mixins from 'theme/mixins';
import colors from 'theme/palette';
import { getButtonStyles } from './utils';

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
		border: ${({ variant }) =>
			variant === 'outlined' ? `1px solid ${findColorInPalette('grey')}` : 'none'};
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
			margin-right: ${({ hasText }) => hasText && '8px'};
			fill: ${colors.white};
			${mixins.transition('fill', '250ms')};
		}
		${getButtonStyles}
		.button-icon {
			fill: ${({ iconColor }) => findColorInPalette(iconColor)};
		}
		${({ styles }) => styles};
	`
};
