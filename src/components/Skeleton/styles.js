import styled from 'styled-components';
import viewsPalette from 'theme/palette';

export default {
	SkeletonContainer: styled.div`
		border-radius: ${({ circle }) => (circle ? ' 50%' : '3px')};
		height: ${({ height }) => height};
		width: ${({ width }) => width};
		background-color: ${({ backgroundColor }) => backgroundColor || viewsPalette.lightGrey};
		animation: pulse 1.5s ease-in-out infinite;

		@keyframes pulse {
			0% {
				opacity: 0.4;
			}
			50% {
				opacity: 0.8;
			}
			100% {
				opacity: 0.4;
			}
		}
	`
};
