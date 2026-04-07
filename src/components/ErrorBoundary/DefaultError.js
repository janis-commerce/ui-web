import React from 'react';
import PropTypes from 'prop-types';
import styled from './styles';

const DefaultError = ({ message }) => (
	<styled.Wrapper>
		<styled.Icon name="exclamation_circle" color="statusRed" />
		<styled.Message>{message}</styled.Message>
	</styled.Wrapper>
);

DefaultError.defaultProps = {
	message: 'Something went wrong'
};

DefaultError.propTypes = {
	message: PropTypes.string
};

export default DefaultError;
