import React from 'react';
import PropTypes from 'prop-types';
import styled from './styles';

const InitialsAvatar = ({ initials, mainColor, imageSize, rounded }) => {
	return (
		<styled.Initials color={mainColor} size={imageSize} rounded={rounded}>
			{initials}
		</styled.Initials>
	);
};

InitialsAvatar.propTypes = {
	initials: PropTypes.shape({}),
	mainColor: PropTypes.string,
	imageSize: PropTypes.string,
	rounded: PropTypes.bool
};

export default InitialsAvatar;
