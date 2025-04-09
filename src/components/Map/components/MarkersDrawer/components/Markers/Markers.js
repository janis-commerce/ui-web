import React from 'react';
import PropTypes from 'prop-types';
import Marker from './components/Marker';

const Markers = ({ readOnly = true, markers = [], markerOptions = {} }) => {
	if (!markers.length) return null;

	return (
		<>
			{markers.map((marker, idx) => (
				<Marker
					markerData={{ ...marker }}
					markerOptions={markerOptions}
					key={`${idx.toString()}-${marker?.position?.lat}-${marker?.position?.lng}`}
					readOnly={readOnly}
					markerIdx={idx}
				/>
			))}
		</>
	);
};

Markers.propTypes = {
	markers: PropTypes.arrayOf(PropTypes.shape({})),
	markerOptions: PropTypes.shape({}),
	readOnly: PropTypes.bool
};

export default Markers;
