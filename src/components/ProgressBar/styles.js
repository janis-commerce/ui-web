import styled from 'styled-components';
import palette from 'theme/palette';

const Bar = styled.div`
	width: 100%;
	height: ${({ height }) => height && `${height}px`};
	background-color: ${palette.grey};
	border-radius: 10px;
	overflow: hidden;
	transition: width 1s linear;
`;

const ProgressFill = styled.div`
	height: 100%;
	transition: all 0.25s;
	width: ${({ value }) => value && `${value}%`};
	background-color: ${({ color }) => color && color};
`;

export default {
	Bar,
	ProgressFill
};
