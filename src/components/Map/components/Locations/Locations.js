import React from 'react';
import PropTypes from 'prop-types';
import Marker from '../Marker';

const Locations = ({ readOnly, setMarker, markers }) => {
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

Locations.propTypes = {
	markers: PropTypes.arrayOf(PropTypes.shape({})),
	readOnly: PropTypes.bool,
	setMarker: PropTypes.func
};

export default Locations;
