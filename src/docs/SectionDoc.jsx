import styled from 'styled-components';
import viewsPalette from 'theme/palette';
import PropTypes from 'prop-types';

const Wrapper = styled.section`
	max-width: 800px;
	margin-inline: auto;

	article {
		padding: ${({ padding }) => (padding ? padding : '0')};
		border-radius: 0.5rem;
		background: ${viewsPalette.white};
	}
`;

const SubTitle = styled.h2`
	background: ${viewsPalette.blue};
	color: ${viewsPalette.white};
	padding: 1rem;
	font-size: 1.2rem;
	border-radius: 0.5rem;
	margin-top: 4rem;
`;

export const SectionDoc = ({ title, children, padding }) => {
	return (
		<Wrapper padding={padding}>
			{title && <SubTitle>{title}</SubTitle>}
			<article> {children}</article>
		</Wrapper>
	);
};

SectionDoc.propTypes = {
	title: PropTypes.string,
	children: PropTypes.node,
	padding: PropTypes.string
};
