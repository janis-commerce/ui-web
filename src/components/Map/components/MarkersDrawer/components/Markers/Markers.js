import React from 'react';
import PropTypes from 'prop-types';
import Marker from './components/Marker';

const Markers = ({ readOnly = true, setMarker = () => {}, markers = [] }) => {
	if (!markers.length) return null;

	return (
		<>
			{markers.map((marker, idx) => (
				<Marker
					markerData={{ ...marker }}
					key={idx}
					readOnly={readOnly}
					markerIdx={idx}
					setMarkerCallback={setMarker}
				/>
			))}
		</>
	);
};

Markers.propTypes = {
	markers: PropTypes.arrayOf(PropTypes.shape({})),
	readOnly: PropTypes.bool,
	setMarker: PropTypes.func
};

export default Markers;
