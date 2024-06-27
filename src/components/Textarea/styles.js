import styled, { css } from 'styled-components';
import palette from 'theme/palette';
import typography from 'theme/typography';
import { timingFunctions, mixins } from 'theme/mixins';
import { mediaBreaks } from 'utils/devices';

const fontSize = typography.size.medium;

const placeholderColor = (props) => {
	const { isFocused, isFloating, disabled, error } = props;

	if (disabled) {
		return palette.grey;
	}

	if (error) {
		return palette.statusRed;
	}

	if (isFocused) {
		return palette.blue;
	}

	if (isFloating) {
		return palette.darkGrey;
	}

	return palette.darkGreyPressed;
};

export default {
	Container: styled.div`
		position: relative;
		width: ${(props) => (props.fullWidth ? '100%' : 'auto')};
	`,
	Textarea: styled.textarea`
		border: none;
		border-bottom: 1px solid ${palette.grey};
		border-radius: 0;
		height: 23px;
		max-height: 350px;
		padding: 0 9px 4px 0;
		resize: none;
		font-size: ${fontSize};
		font-weight: 400;
		color: ${palette.black};
		${mixins.transition('color,border-color', '0.2s')};
		width: ${(props) => (props.fullWidth ? '100%' : 'auto')};

		${mixins.placeholder(css`
			opacity: 1;
			color: ${(props) => placeholderColor(props)};
		`)}

		${mixins.scrollbar(palette.grey, palette.base)}

		&:hover {
			border-color: ${palette.black};
		}

		&:focus {
			border-color: ${palette.blue};
			caret-color: ${palette.blue};
			outline: none;
		}

		&:disabled {
			background-color: ${palette.white};
			color: ${palette.grey};
			border-color: ${palette.grey};
			cursor: default;
		}

		${(props) =>
			props.error &&
			`
			&, &:hover, &:focus {
				border-color: ${palette.statusRed}
			}
		`}

		${mediaBreaks.onlyPrint`
			min-height: initial;
			height: auto !important;
			border-bottom: none;
		`}
	`,
	FloatingLabel: styled.div`
		position: absolute;
		font-size: ${fontSize};
		font-weight: 400;
		color: ${(props) => placeholderColor(props)};
		height: 24px;
		line-height: 22px;
		top: 0;
		left: 0;
		pointer-events: ${({ isTranslateActive }) => (isTranslateActive ? 'auto' : 'none')};
		transform-origin: top left;
		transform: ${(props) => props.isFloating && 'translate(0, -18px) scale(0.75)'};
		transition: all 0.2s ${timingFunctions.standard};
	`,
	ErrorMessage: styled.span`
		color: ${palette.statusRed};
		font-size: 12px;
		line-height: 14px;
		display: block;
		word-break: break-word;
	`
};
