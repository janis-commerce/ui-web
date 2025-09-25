import styled, { css } from 'styled-components';
import palette from 'theme/palette';
import { getColor } from 'theme/utils';
import { mediaBreaks } from 'utils/devices';

const getChipVariant = (props) => {
	const { selected, color, sizeColor, variant } = props;
	const variantStyles = {
		outlined: () => css`
			border: 1px solid ${selected ? palette.blue : '#EAEBED'};
			color: ${selected ? palette.blue : palette.black};
			&:hover {
				background-color: ${palette.lightGreyHover};
			}
			&:hover .chip-icon,
			&:hover .delete-button {
				fill: ${selected ? palette.blue : palette.black};
			}
			&:active {
				border-color: ${palette.blue};
				color: ${palette.blue};
				background-color: transparent;
			}
			&:active .chip-icon,
			&:active .delete-button {
				fill: ${palette.blue};
			}
		`,
		contained: () => css`
			background-color: ${selected ? palette.blue : palette.lightGreyHover};
			color: ${selected ? palette.white : palette.black};
			.chip-icon {
				fill: ${selected ? palette.white : palette.black};
			}
			.delete-button {
				fill: ${selected ? palette.white : palette.darkGrey};
			}
			&:hover {
				background-color: ${selected ? palette.blueHover : palette.lightGrey};
			}
			&:hover .delete-button {
				fill: ${selected ? palette.white : palette.black};
			}
			&:active {
				background-color: ${palette.blue};
				color: ${palette.white};
			}
			&:active .chip-icon,
			&:active .delete-button {
				fill: ${palette.white};
			}
			&:disabled {
				fill: ${palette.grey};
				color: ${palette.grey};
			}
		`,
		status: () => css`
			background-color: ${getColor(color || 'grey')};
			color: ${getColor(sizeColor || 'white')};
			font-weight: 700;
			border: none;
			height: 24px;
			padding: 0 17px;
			line-height: 28px;
			max-width: 170px;
		`
	};

	return variantStyles[variant] || '';
};

export default {
	Chip: styled.button`
		padding: ${(props) => (!props.onlyIcon ? '0 12px' : '0')};
		cursor: ${(props) => (props.clickable ? 'pointer' : 'default')};
		font-size: 13px;
		color: ${palette.black};
		height: ${(props) => (!props.onlyIcon ? '32px' : '36px')};
		width: ${(props) => props.onlyIcon && '36px'};
		min-width: 36px;
		border-radius: ${(props) => (!props.onlyIcon ? '50px' : '50%')};
		display: inline-flex;
		justify-content: center;
		align-items: center;
		pointer-events: ${(props) => (props.clickable || props.hasLink ? 'auto' : 'none')};
		white-space: nowrap;

		.chip-icon {
			${(props) => !props.onlyIcon && 'margin-right: 8px'};
		}

		${(props) => getChipVariant(props)};

		${(props) => props.styles};

		${(props) => props.borderColor && `border: solid 1px ${getColor(props.borderColor)};`}

		${(props) => props.backgroundColor && `background-color: ${getColor(props.backgroundColor)};`}

		${(props) => props.textColor && `color: ${getColor(props.textColor)};`}

		${mediaBreaks.onlyPrint`
			border: 1px solid ${palette.darkGrey};
		`}
	`,
	DeleteButton: styled.button`
		width: 16px;
		height: 16px;
		margin-left: 12px;
	`,
	Children: styled.div`
		text-overflow: ellipsis;
		overflow: hidden;
	`
};
