import React from 'react';
import PropTypes from 'prop-types';
import Markers from './components/Markers';
import Route from './components/Route';

const MarkersDrawer = ({
	markers = [],
	readOnly = false,
	setMarker = () => {},
	callbackOnSuccessDirections = () => {},
	callbackOnErrorDirections = () => {},
	googleMapsApiKey = ''
}) => {
	const commonProps = { readOnly, setMarker };
	return (
		<>
			{markers.map((marker, idx) =>
				marker?.polylines ? (
					<Route
						key={`${idx.toString()}`}
						{...commonProps}
						routeData={marker}
						callbackOnSuccessDirections={callbackOnSuccessDirections}
						callbackOnErrorDirections={callbackOnErrorDirections}
						googleMapsApiKey={googleMapsApiKey}
					/>
				) : (
					<Markers key={`${idx.toString()}`} {...commonProps} markers={marker.points} />
				)
			)}
		</>
	);
};

MarkersDrawer.propTypes = {
	markers: PropTypes.arrayOf(
		PropTypes.shape({
			polylines: PropTypes.array,
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
	callbackOnSuccessDirections: PropTypes.func,
	callbackOnErrorDirections: PropTypes.func,
	googleMapsApiKey: PropTypes.string
};

export default MarkersDrawer;
