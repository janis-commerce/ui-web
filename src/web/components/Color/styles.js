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

export const storybook = {
	Grid: styled.div`
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(140px, 1fr));
		grid-gap: 15px;
	`,
	Item: styled.div`
		padding: 5px;
		border: 1px dashed #ccc;
		cursor: default;
		display: grid;
		justify-items: center;
		justify-content: center;
		grid-row-gap: 5px;
	`
};
