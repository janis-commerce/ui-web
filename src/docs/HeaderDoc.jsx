import styled from 'styled-components';
import viewsPalette from 'theme/palette';
import PropTypes from 'prop-types';

const Header = styled.header`
	background-color: ${viewsPalette.blue};
	padding: 2rem 4rem;
	margin: 0;
	color: ${viewsPalette.white};

	div {
		display: flex;
		justify-content: space-between;
	}

	p {
		font-size: 1 rem;
	}

	h1 {
		font-size: 50px;
		font-weight: 500;
	}
`;

export const HeaderDoc = ({ title }) => {
	return (
		<Header>
			<div>
				<p>Design System</p>
				<p>Documentacion</p>
			</div>
			<h1>{title}</h1>
		</Header>
	);
};

HeaderDoc.propTypes = {
	title: PropTypes.string.isRequired
};
