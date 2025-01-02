import React from 'react';
import PropTypes from 'prop-types';
import Locations from '../Locations';
import Route from '../Route';

const MarkersDrawer = ({ markers, readOnly, setMarker, saveRouteData, googleMapsApiKey }) => {
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

MarkersDrawer.propTypes = {
	markers: PropTypes.arrayOf(
		PropTypes.shape({
			drawRoute: PropTypes.bool,
			points: PropTypes.arrayOf(
				PropTypes.shape({
					position: PropTypes.shape({ lat: PropTypes.number, lng: PropTypes.number }),
					icon: PropTypes.object,
					overlay: PropTypes.element,
					infoWindowChildren: PropTypes.element
				})
			),
			polylineOptions: PropTypes.shape({
				strokeColor: PropTypes.string,
				strokeOpacity: PropTypes.number,
				strokeWeight: PropTypes.number
			})
		})
	),
	readOnly: PropTypes.bool,
	setMarker: PropTypes.func,
	saveRouteData: PropTypes.func,
	googleMapsApiKey: PropTypes.string
};

export default MarkersDrawer;
