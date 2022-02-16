import styled, { css } from 'styled-components';
import colors from 'theme/palette';
import { timingFunctions } from 'theme/utils';
import { mediaBreaks } from 'devices';

const { onlyDesktop, onlyPrint } = mediaBreaks;

export const statusColor = (props) => {
	const { checked, disabled } = props;
	switch (true) {
		case disabled && checked:
			return colors.blueDisabled;
		case disabled:
			return colors.grey.main;
		case checked:
			return colors.blue;
		default:
			return colors.darkGrey;
	}
};

const Ball = styled.div`
	width: 16px;
	height: 16px;
	border-radius: 50%;
	position: absolute;
	top: 4px;
	left: 4px;
	background-color: ${colors.base.white};
	transition: all ${timingFunctions.standard} 0.2s;

	${(props) =>
		props.checked &&
		`
			left: 100%;
			margin-left: -20px;
		`}
`;

const iconCheckStyles = css`
	position: absolute;
	fill: ${(props) => statusColor(props)};
	${onlyPrint`
		fill: ${(props) => (props.checked ? colors.black : colors.darkGrey)} !important;
	`}
`;

export default {
	OuterContainer: styled.div`
		display: flex;
		width: 44px;
		align-items: center;
		pointer-events: ${(props) => (props.disabled ? 'none' : 'auto')};
		align-self: center;
		position: relative;
		${onlyDesktop`
			&:hover ${Ball} {
				box-shadow: 0px 0px 0px 10px ${colors.lightGreyHover};
			}
		`}

		&:active ${Ball} {
			box-shadow: 0px 0px 0px 10px ${colors.lightGrey};
			${/* sc-selector */ iconCheckStyles} svg {
				fill: ${(props) => (props.checked ? colors.blue : colors.darkGrey)};
			}
		}
	`,
	Input: styled.input`
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		opacity: 0;
		cursor: pointer;
		z-index: 1;
	`,
	Ball,
	Container: styled.div`
		width: 44px;
		height: 24px;
		background-color: ${(props) => statusColor(props)};
		border-radius: 50px;
		position: relative;
		${onlyPrint`
			border: 1px solid ${colors.darkGrey};
		`}
	`,
	iconCheckStyles
};
