import styled from 'styled-components';

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
