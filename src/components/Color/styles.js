import styled from 'styled-components';
import colors from 'theme/palette';

export default {
	Wrapper: styled.div`
		display: flex;
		align-items: center;
	`,
	ColorSample: styled.div`
		display: block;
		width: 16px;
		height: 16px;
		background-color: ${(props) => props.color};
		border: 1px solid ${colors.grey};
		border-radius: 50%;
	`,
	Label: styled.span`
		margin-left: 5px;
		text-transform: ${(props) => (/#/.test(props.color) ? 'uppercase' : 'initial')};
	`
};
