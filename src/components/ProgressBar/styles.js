import styled from 'styled-components';
import palette from 'theme/palette';

const Bar = styled.div`
	width: 100%;
	height: ${({ height = 16 }) => `${height}px`};
	background-color: ${palette.grey};
	border-radius: 10px;
	overflow: hidden;
`;

const ProgressFill = styled.div`
	height: 100%;
	transition: all 0.25s;
	width: ${({ value = 0 }) => `${Math.max(0, Math.min(100, value))}%`};
	background-color: ${({ color = palette.blue }) => color};
`;

export default {
	Bar,
	ProgressFill
};
