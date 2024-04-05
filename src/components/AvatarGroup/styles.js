import styled, { css } from 'styled-components';
import Chip from 'components/Chip';
import viewsPalette from 'theme/palette';

export default {
	AvatarGroup: styled(Chip)`
		pointer-events: none;
		${({ showFull, backgroundColor }) =>
			showFull
				? css`
						height: 45px;
						padding-left: 9px;
						padding-right: 9px;
						max-width: inherit;
						&:hover,
						&:active {
							background: ${backgroundColor || viewsPalette.white};
						}
				  `
				: css`
						height: 33px;
						padding-left: 5px;
						padding-right: 5px;
						cursor: pointer;
				  `}
		background: ${({ backgroundColor }) => backgroundColor || viewsPalette.white};
		${({ inactive }) =>
			inactive &&
			`
           &:hover {
               background: ${viewsPalette.white};
           }
           &:active {
               border-color: #EAEBED;
           }
    `}
		& div {
			display: flex;
			& div,
			img,
			span {
				&:not(:first-child) {
					margin-left: -4px;
				}
			}
			span:first-of-type {
				margin-left: 0px;
			}
		}
	`,
	ExtraButton: styled.div`
		&:active {
			border-color: green;
		}
	`
};
