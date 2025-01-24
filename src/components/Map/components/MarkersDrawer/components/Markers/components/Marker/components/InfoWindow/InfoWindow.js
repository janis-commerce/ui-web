import React from 'react';
import PropTypes from 'prop-types';
import { InfoWindow as InfoWindowComponent } from '@react-google-maps/api';

const InfoWindow = ({ infoWindowHandles, data, children }) => {
	const infoWindowProps = { ...infoWindowHandles };

	return (
		<div {...infoWindowProps}>
			<InfoWindowComponent position={data}>{children}</InfoWindowComponent>
		</div>
	);
};

InfoWindow.propTypes = {
	/** The edit data */
	data: PropTypes.shape({}),
	/* themes object */
	themes: PropTypes.shape({}),
	/** The schema to display */
	schema: PropTypes.shape({}),
	infoWindowHandles: PropTypes.shape({}),
	children: PropTypes.element
};

export default InfoWindow;
