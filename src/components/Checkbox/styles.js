import styled, { css } from 'styled-components';
import { timingFunctions, findColorInPalette } from 'theme/utils';

export default {
	Container: styled.label`
		background: ${(props) =>
			props.checked ? findColorInPalette('blue') : findColorInPalette('white')};
		border: 1px solid
			${(props) => (props.checked ? findColorInPalette('blue') : findColorInPalette('black'))};
		border-radius: ${(props) => (props.rounded ? '50' : '3')}px;
		width: 16px;
		height: 16px;
		line-height: 16px;
		position: relative;
		cursor: pointer;
		display: flex;
		transition: background ${timingFunctions.standard} 0.2s;
		user-select: none;
		margin-right: 12px;
		${(props) => props.styles};
	`,
	Input: styled.input`
		opacity: 0;
		position: absolute;
		cursor: pointer;
	`,
	iconCheckStyles: css`
		transform: translateY(-5%);
		fill: ${findColorInPalette('white')};
		${(props) =>
			!!props.rounded &&
			`
			flex-shrink: 0;
			padding-right: 1px;
		`}
	`
};
