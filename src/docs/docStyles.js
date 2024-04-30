import styled from 'styled-components';
import viewsPalette from 'theme/palette';

export const GeneralWrapper = styled.div`
	background: #eaebed;
	padding-bottom: 4rem;
`;

export const VariantWrapper = styled.article`
 background: ${viewsPalette.white};
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  justify-content: start;
  align-content: start;
  margin-top: 1rem;

	.type {
		background: #f6f6f6;
    padding: 1rem;
    border-radius: 0.5rem 0 0 0.5rem;
	}

	.stories {
	  padding: 1rem;
    display: flex;
    flex-direction: column;
    justify-content: start;
    align-items: center;
    position: relative;
    height: 150px;
    
    p {
    align-self: start;
    margin-bottom: 3rem;
    font-size: 1rem;
    }
	}

	div:nth-child(3) {
		border-inline: 1px solid #D5D7DB;
    width: 100%
    margin: 0 auto;
    align-self: start;
	}
`;
