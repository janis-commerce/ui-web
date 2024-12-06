import React from 'react';
import PropTypes from 'prop-types';
import { InfoWindow } from '@react-google-maps/api';

const InfoWindowComponent = ({ infoWindowHandles, data, children }) => {
	const infoWindowProps = { ...infoWindowHandles };

	return (
		<div {...infoWindowProps}>
			<InfoWindow position={data}>{children}</InfoWindow>
		</div>
	);
};

InfoWindowComponent.propTypes = {
	/** The edit data */
	data: PropTypes.shape({}),
	/* themes object */
	themes: PropTypes.shape({}),
	/** The schema to display */
	schema: PropTypes.shape({}),
	infoWindowHandles: PropTypes.shape({}),
	children: PropTypes.element
};

export default InfoWindowComponent;
