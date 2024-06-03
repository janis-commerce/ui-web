import styled from 'styled-components';
import viewsPalette from 'theme/palette';

export const GeneralWrapper = styled.div`
	background: #eaebed;
	padding-bottom: 4rem;
`;

export const VariantWrapper = styled.article`
	background: ${viewsPalette.white};
	display: flex;
	justify-content: flex-start;
	margin-top: 1rem;

	.type {
		background: #f6f6f6;
		padding: 1rem;
		border-radius: 0.5rem 0 0 0.5rem;
		width: 150px;
	}
`;

export const GridWrapper = styled.div`
	width: 100%;
	display: grid;
	grid-template-columns: repeat(3, 1fr);

	.stories {
		padding: 1rem;
		border: 1px solid #f6f6f6;
		min-height: 200px;
		display: flex;
		flex-direction: column;
		align-items: center;

		p {
			align-self: start;
			margin-bottom: 3rem;
			font-size: 1rem;
		}
	}
`;
