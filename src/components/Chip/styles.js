import styled, { css } from 'styled-components';
import palette from 'theme/palette';
import { getColor } from 'theme/utils';
import { mediaBreaks } from 'utils/devices';

export default {
	Chip: styled.button`
		padding: ${(props) => (props.hasText ? '0 12px' : '0')};
		cursor: ${(props) => (props.clickable ? 'pointer' : 'default')};
		font-size: 13px;
		color: ${palette.black.main};
		height: ${(props) => (props.hasText ? '32px' : '36px')};
		width: ${(props) => !props.hasText && '36px'};
		max-width: 150px;
		border-radius: ${(props) => (props.hasText ? '50px' : '50%')};
		display: inline-flex;
		justify-content: center;
		align-items: center;
		pointer-events: ${(props) => (props.clickable ? 'auto' : 'none')};
		white-space: nowrap;
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
						color: ${props.selected ? palette.base.withe : palette.black.main};

						.chip-icon {
							fill: ${props.selected ? palette.base.withe : palette.black.main};
						}
						.delete-button {
							fill: ${props.selected ? palette.base.withe : palette.grey.dark};
						}

						&:hover {
							background-color: ${props.selected ? palette.primary.mainHover : palette.white.main};
						}
						&:hover .delete-button {
							fill: ${props.selected ? palette.base.withe : palette.black.main};
						}
						&:active {
							background-color: ${palette.primary.main};
							color: ${palette.base.withe};
						}
						&:active .chip-icon,
						&:active .delete-button {
							fill: ${palette.base.withe};
						}

						&:disabled {
							fill: ${palette.grey.main};
							color: ${palette.grey.main};
						}
					`;
				case 'status':
					return css`
						background-color: ${getColor(props.color.type || 'grey', props.color.color || 'main')};
						color: ${getColor(props.sizeColor.type || 'white', props.sizeColor.color || 'main')};
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

		${(props) =>
			props.borderColor &&
			`border: solid 1px ${getColor(props.borderColor.type, props.borderColor.color)};`}

		${(props) =>
			props.backgroundColor &&
			`background-color: ${getColor(props.backgroundColor.type, props.backgroundColor.color)};`}

		${(props) => props.textColor && `color: ${getColor(props.textColor.type, props.textColor.color)};`}

		${mediaBreaks.onlyPrint`
			border: 1px solid ${palette.darkGrey};
		`}
	`,
	Children: styled.div`
		text-overflow: ellipsis;
		overflow: hidden;
	`
};
