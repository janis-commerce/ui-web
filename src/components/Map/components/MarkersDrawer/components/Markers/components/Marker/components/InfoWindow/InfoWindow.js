import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import { InfoWindow as InfoWindowComponent } from '@react-google-maps/api';
import { isNumber } from 'utils';
import styled from './styles';

const InfoWindow = ({ data, infoWindowOptions = {}, infoWindowHandles, children }) => {
	const { infoWindowPosition = {} } = infoWindowOptions;
	const pixelOffset = useMemo(
		() =>
			new window.google.maps.Size(
				isNumber(infoWindowPosition?.x) ? infoWindowPosition?.x : 0,
				isNumber(infoWindowPosition?.y) ? infoWindowPosition?.y : -35
			),
		[infoWindowPosition?.x, infoWindowPosition?.y]
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
		infoWindowPosition: PropTypes.shape({
			x: PropTypes.number,
			y: PropTypes.number
		})
	}),
	infoWindowHandles: PropTypes.shape({}),
	children: PropTypes.element
};

export default InfoWindow;
