import styled, { keyframes, css } from 'styled-components';
import { getColor } from 'theme/utils';

const rotate = keyframes`
	to {
		transform: rotate(360deg);
	}
`;

const Spinner = styled.div`
	${({ color, duration, size, thickness }) => css`
		width: ${size}px;
		height: ${size}px;
		border-radius: 50%;
		background-color: transparent;
		border-top: ${thickness}px solid ${getColor(color)};
		border-right: ${thickness}px solid ${getColor(color)};
		border-bottom: ${thickness}px solid ${getColor(color)};
		border-left: ${thickness}px solid ${getColor('grey')};
		animation: ${rotate} ${duration}s linear infinite;
		position: absolute;
	`}
`;

export const SpinnerWrapper = styled.div`
	position: relative;
	display: flex;
	justify-content: center;
	align-items: center;
	width: ${({ size }) => size}px;
	height: ${({ size }) => size}px;
`;

export const CenterContent = styled.div`
	position: absolute;
	display: flex;
	justify-content: center;
	align-items: center;
`;

export default { Spinner, CenterContent, SpinnerWrapper };
