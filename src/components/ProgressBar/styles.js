import styled, { css, keyframes } from 'styled-components';
import palette from 'theme/palette';
import { isNumber } from 'utils';

const Bar = styled.div`
	width: 100%;
	height: ${({ height = 16 }) => `${height}px`};
	background-color: ${palette.grey};
	border-radius: 10px;
	overflow: hidden;
`;

const progressAnimation = (scale = 1) => keyframes`
	0% { transform: scaleX(0); }
	100% { transform: scaleX(${scale}); }
`;

const ProgressFill = styled.div`
	width: 100%;
	height: 100%;
	transform-origin: left center;
	background-color: ${({ color = palette.blue }) => color};

	${({ value = 0, maxValue = 100, animated = false, duration = 1 }) => {
		const scale = value / maxValue;

		return animated && isNumber(duration) && duration > 0
			? css`
					animation: ${progressAnimation(scale)} ${`${duration}s`} linear forwards;
			  `
			: css`
					transform: scaleX(${scale});
			  `;
	}}
`;

export default {
	Bar,
	ProgressFill
};
