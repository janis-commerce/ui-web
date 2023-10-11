import styled, { css } from 'styled-components';
import palette from 'theme/palette';
import { getColor } from 'theme/utils';
import mixins from 'theme/mixins';
import { mediaBreaks } from 'utils/devices';

export default {
	Chip: styled.button`
		padding: 0 12px;
		cursor: ${(props) => (props.clickable ? 'pointer' : 'default')};
		font-size: 13px;
		color: ${palette.black.main};
		height: 32px;
		min-width: 36px;
		max-width: 150px;
		border-radius: 50px;
		display: inline-flex;
		justify-content: center;
		align-items: center;
		pointer-events: ${(props) => (props.clickable || props.hasLink ? 'auto' : 'none')};
		white-space: nowrap;

		.chip-icon {
			margin-right: 8px;
		}

		${(props) => {
			switch (props.variant) {
				case 'outlined':
					return css`
						border: 1px solid ${props.selected ? palette.primary.main : '#EAEBED'};
						color: ${props.selected ? palette.primary.main : palette.black.main};

						&:hover {
							background-color: ${palette.white.hover};
						}
						&:hover .chip-icon,
						&:hover .delete-button {
							fill: ${props.selected ? palette.primary.main : palette.black.main};
						}
						&:active {
							border-color: ${palette.primary.main};
							color: ${palette.primary.main};
							background-color: transparent;
						}
						&:active .chip-icon,
						&:active .delete-button {
							fill: ${palette.primary.main};
						}
					`;
				case 'contained':
					return css`
						background-color: ${props.selected ? palette.primary.main : palette.white.hover};
						color: ${props.selected ? palette.base.white : palette.black.main};

						.chip-icon {
							fill: ${props.selected ? palette.base.white : palette.black.main};
						}
						.delete-button {
							fill: ${props.selected ? palette.base.white : palette.grey.dark};
						}

						&:hover {
							background-color: ${props.selected ? palette.primary.mainHover : palette.white.main};
						}
						&:hover .delete-button {
							fill: ${props.selected ? palette.base.white : palette.black.main};
						}
						&:active {
							background-color: ${palette.primary.main};
							color: ${palette.base.white};
						}
						&:active .chip-icon,
						&:active .delete-button {
							fill: ${palette.base.white};
						}

						&:disabled {
							fill: ${palette.grey.main};
							color: ${palette.grey.main};
						}
					`;
				case 'status':
					return css`
						background-color: ${getColor(props.color || 'grey')};
						color: ${getColor(props.sizeColor || 'base.white')};
						font-weight: 700;
						border: none;
						height: 24px;
						padding: 0 17px;
						line-height: 28px;
						max-width: 170px;
					`;
				default:
					return '';
			}
		}}
		${(props) => props.styles};

		${(props) => props.borderColor && `border: solid 1px ${getColor(props.borderColor)};`}

		${(props) => props.backgroundColor && `background-color: ${getColor(props.backgroundColor)};`}

		${(props) => props.textColor && `color: ${getColor(props.textColor)};`}

		${mediaBreaks.onlyPrint`
			border: 1px solid ${palette.grey.dark};
		`}
	`,
	iconPathStyles: css`
		${mixins.transition('fill')};
	`,
	DeleteButton: styled.button`
		width: 16px;
		height: 16px;
		margin-left: 12px;
	`,
	deleteButtonPathStyles: css`
		${mixins.transition('fill')};
	`,
	Children: styled.div`
		text-overflow: ellipsis;
		overflow: hidden;
	`
};
