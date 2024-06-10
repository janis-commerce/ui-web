import styled from 'styled-components';
import viewsPalette from 'theme/palette';

export const GeneralWrapper = styled.div`
	background: ${viewsPalette.lightGrey};
	padding-bottom: 4rem;
`;

export const VariantWrapper = styled.article`
	background: ${viewsPalette.white};
	display: flex;
	justify-content: flex-start;
	margin-top: 1rem;
	box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.1);

	.type {
		background: ${viewsPalette.lightGreyHover};
		padding: 1rem;
		border-radius: 0.5rem 0 0 0.5rem;
		width: 150px;
	}
`;

export const GridWrapper = styled.div`
	width: 100%;
	display: grid;
	grid-template-columns: repeat(${({ columnQuantity }) => columnQuantity || '2'}, 1fr);

	.stories {
		padding: 1rem;
		border: 1px solid ${viewsPalette.lightGreyHover};
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
