import React from 'react';
import PropTypes from 'prop-types';
import styled from './styles';

const DefaultError = ({ message }) => (
	<styled.Wrapper>
		<styled.Icon name="exclamation_circle" color="statusRed" />
		<p color="statusRed" fontSize="baseSmall">
			{message}
		</p>
	</styled.Wrapper>
);

DefaultError.defaultProps = {
	message: 'something went wrong error'
};

DefaultError.propTypes = {
	message: PropTypes.string
};

export default DefaultError;
