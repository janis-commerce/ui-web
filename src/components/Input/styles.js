import styled, { css } from 'styled-components';
import palette from 'theme/palette';
import typography from 'theme/typography';
import { timingFunctions, mixins } from 'theme/mixins';
import { mediaBreaks } from 'utils/devices';
import Icon from 'components/Icon';

const fontSize = typography.size.medium;

const changeColor = (props) => {
	const { isFocused, isFloating, disabled, error } = props;

	if (disabled) return palette.grey;

	if (error) return palette.statusRed;

	if (isFocused) return palette.blue;

	if (isFloating) return palette.darkGrey;

	return palette.darkGreyPressed;
};

const hoverAndFocusColor = (props) => {
	const { isFocused, disabled, error } = props;

	if (disabled) return palette.grey;

	if (error) return palette.statusRed;

	if (isFocused) return palette.blue;

	return palette.black;
};

export default {
	Container: styled.div`
		position: relative;
		width: ${(props) => (props.fullWidth ? '100%' : 'auto')};
	`,

	FloatingLabel: styled.div`
		position: absolute;
		font-size: ${fontSize};
		font-weight: 400;
		color: ${(props) => changeColor(props)};
		height: 30px;
		line-height: 30px;
		bottom: 0;
		left: 0;
		${({ isTranslateActive }) => !isTranslateActive && `pointer-events: none;`}
		transform-origin: top left;
		transform: ${(props) => props.isFloating && 'translate(0, -18px) scale(0.75)'};
		transition: all 0.2s ${timingFunctions.standard};
		${({ hasIcon, isFloating }) => hasIcon && !isFloating && `padding-left: 32px`}
	`,
	Input: styled.input`
		/*stylelint-disable-next-line block-no-empty */
		@keyframes onAutoFill {
		}

		${(props) => !props.noMinWidth && 'min-width: 100px;'}
		height: 34px;
		border: none;
		font-size: ${fontSize};
		font-weight: 400;
		color: ${palette.black};
		transition: color 0.2s ${timingFunctions.standard};
		cursor: pointer;
		width: 100%;
		border-bottom: 1px solid ${palette.grey};
		border-radius: 0;
		${({ error }) => error && `border-bottom-color: ${palette.statusRed};`}
		${({ hasIcon }) => hasIcon && `padding-left: 32px;`}
		${mixins.placeholder(css`
			font-weight: 400;
			color: ${({ error }) => (error ? palette.statusRed : palette.darkGreyPressed)};
		`)}

		&:hover {
			border-color: ${(props) => hoverAndFocusColor(props)};
		}
		&:focus {
			border-color: ${(props) => hoverAndFocusColor(props)};
			caret-color: ${(props) => hoverAndFocusColor(props)};
			outline: none;
		}

		&:disabled {
			background-color: ${palette.white};
			color: ${palette.grey};
			border-color: ${palette.grey};
			cursor: default;
		}

		&:-webkit-autofill {
			animation-name: onAutoFill;
		}

		::-webkit-inner-spin-button {
			appearance: none;
		}

		${mediaBreaks.onlyPrint`
			border-bottom: none;
		`}
	`,
	ErrorMessage: styled.span`
		color: ${palette.statusRed};
		font-size: 12px;
		line-height: 14px;
		transform: translateY(-6px);
		word-break: break-word;
	`,
	InputIcon: styled(Icon)`
		position: absolute;
		flex-shrink: 0;
		flex-grow: 0;
		margin-right: 8px;
		height: 100%;
	`
};
