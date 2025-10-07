import React from 'react';
import PropTypes from 'prop-types';
import Markers from './components/Markers';
import Route from './components/Route';

const MarkersDrawer = ({
	markers = [],
	markerOptions = {},
	readOnly = true,
	callbackOnSuccessDirections = () => {},
	callbackOnErrorDirections = () => {},
	googleMapsApiKey = ''
}) => {
	const commonProps = { readOnly };
	return (
		<>
			{markers.map((marker, idx) =>
				marker?.polylines && marker?.polylines?.length ? (
					<Route
						key={`${idx.toString()}`}
						{...commonProps}
						routeData={marker}
						markerOptions={markerOptions}
						callbackOnSuccessDirections={callbackOnSuccessDirections}
						callbackOnErrorDirections={callbackOnErrorDirections}
						googleMapsApiKey={googleMapsApiKey}
					/>
				) : (
					<Markers
						key={`${idx.toString()}`}
						{...commonProps}
						markers={marker.points}
						markerOptions={markerOptions}
					/>
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
					infoWindowChildren: PropTypes.node
				})
			),
			polylineOptions: PropTypes.shape({
				strokeColor: PropTypes.string,
				strokeOpacity: PropTypes.number,
				strokeWeight: PropTypes.number
			})
		})
	),
	markerOptions: PropTypes.shape({}),
	readOnly: PropTypes.bool,
	callbackOnSuccessDirections: PropTypes.func,
	callbackOnErrorDirections: PropTypes.func,
	googleMapsApiKey: PropTypes.string
};

export default MarkersDrawer;
