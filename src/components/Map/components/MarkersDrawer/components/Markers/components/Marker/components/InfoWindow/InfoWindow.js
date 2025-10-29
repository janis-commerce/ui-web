import React from 'react';
import PropTypes from 'prop-types';
import { InfoWindow as InfoWindowComponent } from '@react-google-maps/api';
import { isNumber } from 'utils';
import styled from './styles';

const InfoWindow = ({ data, infoWindowOptions = {}, infoWindowHandles, children }) => {
	const { position = {} } = infoWindowOptions;
	const pixelOffset = new window.google.maps.Size(
		isNumber(position?.x) ? position?.x : 0,
		isNumber(position?.y) ? position?.y : -35
	);

	return (
		<InfoWindowComponent position={data} options={{ pixelOffset }}>
			<styled.Content className="google-map-component__info-window--content" {...infoWindowHandles}>
				{children}
			</styled.Content>
		</InfoWindowComponent>
	);
};

InfoWindow.propTypes = {
	data: PropTypes.shape({}),
	infoWindowOptions: PropTypes.shape({
		position: PropTypes.shape({
			x: PropTypes.number,
			y: PropTypes.number
		})
	}),
	infoWindowHandles: PropTypes.shape({}),
	children: PropTypes.element
};

export default InfoWindow;
