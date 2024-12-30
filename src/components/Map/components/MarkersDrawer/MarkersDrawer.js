import React from 'react';
import PropTypes from 'prop-types';
import Locations from '../Locations';
import Route from '../Route';

const MarkerDrawer = ({ markers, readOnly, setMarker, saveRouteData, googleMapsApiKey }) => {
	const commonProps = { readOnly, setMarker };
	return (
		<>
			{markers.map((marker, idx) =>
				marker.drawRoute ? (
					<Route
						key={`${idx.toString()}`}
						{...commonProps}
						routeData={marker}
						saveRouteData={saveRouteData}
						googleMapsApiKey={googleMapsApiKey}
					/>
				) : (
					<Locations key={idx} {...commonProps} markers={marker.points} />
				)
			)}
		</>
	);
};

MarkerDrawer.propTypes = {
	markers: PropTypes.arrayOf({}),
	readOnly: PropTypes.bool,
	setMarker: PropTypes.func,
	saveRouteData: PropTypes.func,
	googleMapsApiKey: PropTypes.string
};

export default MarkerDrawer;
