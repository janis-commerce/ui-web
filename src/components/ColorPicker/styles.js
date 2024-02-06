import styled from 'styled-components';
import palette from 'theme/palette';
import { findColorInPalette } from 'theme/utils';
import InputBase from 'components/Input';

export default {
	ClickableWrapper: styled.div`
		display: flex;
		align-items: center;
		border: none;
		cursor: pointer;
		&:before {
			content: '';
			z-index: 1;
			display: inline-block;
			border: 1px solid ${palette.grey};
			background-color: ${(props) => findColorInPalette(props.color)};
			border-radius: 48%;
			width: 14px;
			height: 14px;
			margin: 7px 4px;
			position: absolute;
			margin-bottom: ${(props) => (props.error ? '25' : '7')}px;
		}
	`,
	ClosePickerWrapper: styled.div`
		position: fixed;
		top: 0px;
		right: 0px;
		bottom: 0px;
		left: 0px;
	`,
	Input: styled(InputBase)`
		padding-left: 26px;
	`,
	PickerWrapper: styled.div`
		position: absolute;
		top: 31px;
		z-index: 2;
		left: 0;
		margin-top: 15px;
	`,
	Wrapper: styled.div`
		display: flex;
		flex-direction: column;
		width: 100%;
		position: relative;
	`
};
