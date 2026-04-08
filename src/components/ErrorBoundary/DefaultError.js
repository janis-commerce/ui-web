import React from 'react';
import PropTypes from 'prop-types';
import styled from './styles';

const DefaultError = ({ message = 'Something went wrong' }) => (
	<styled.Wrapper>
		<styled.Icon name="exclamation_circle" color="statusRed" />
		<styled.Message>{message}</styled.Message>
	</styled.Wrapper>
);

DefaultError.propTypes = {
	message: PropTypes.string
};

export default DefaultError;
