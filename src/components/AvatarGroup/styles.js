import styled, { css } from 'styled-components';
import Chip from 'components/Chip';
import palette from 'theme/palette';

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
							background: ${backgroundColor || palette.white};
						}
				  `
				: css`
						height: 33px;
						padding-left: 5px;
						padding-right: 5px;
						cursor: pointer;
				  `}
		background: ${({ backgroundColor }) => backgroundColor || palette.white};
		${({ inactive }) =>
			inactive &&
			`
           &:hover {
               background: ${palette.white};
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
	`
};
