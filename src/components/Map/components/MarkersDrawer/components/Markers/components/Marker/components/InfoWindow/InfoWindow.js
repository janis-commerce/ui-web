import React from 'react';
import PropTypes from 'prop-types';
import { InfoWindow as InfoWindowComponent } from '@react-google-maps/api';
import styled from './styles';

const InfoWindow = ({ infoWindowHandles, data, children }) => {
	return (
		<InfoWindowComponent position={data}>
			<styled.Content className="google-map-component__info-window--content" {...infoWindowHandles}>
				{children}
			</styled.Content>
		</InfoWindowComponent>
	);
};

InfoWindow.propTypes = {
	data: PropTypes.shape({}),
	infoWindowHandles: PropTypes.shape({}),
	children: PropTypes.element
};

export default InfoWindow;
