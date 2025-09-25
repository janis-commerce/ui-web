import styled from 'styled-components';
import palette from 'theme/palette';

const Progress = styled.progress`
	width: 100%;
	height: ${({ height = 16 }) => `${height}px`};
	border-radius: 10px;

	&::-webkit-progress-bar {
		background-color: ${palette.grey};
		border-radius: 10px;
	}

	&::-webkit-progress-value {
		background-color: ${({ color = palette.blue }) => color};
		border-radius: 10px;
		transition: width 0.8s ease-in-out;
	}

	&::-moz-progress-bar {
		background-color: ${({ color = palette.blue }) => color};
		border-radius: 10px;
	}
`;

export default {
	Progress
};
