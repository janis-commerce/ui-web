import React from 'react';
import PropTypes from 'prop-types';
import { Polyline } from '@react-google-maps/api';
import Markers from '../Markers';

const Route = ({ routeData = {}, markerOptions = {}, readOnly = true }) => {
	const { polylines = [] } = routeData;
	return (
		<>
			<Markers readOnly={readOnly} markers={routeData.points} markerOptions={markerOptions} />
			<Polyline path={polylines} options={routeData.polylineOptions} />
		</>
	);
};

Route.propTypes = {
	routeData: PropTypes.shape({
		polylines: PropTypes.array,
		points: PropTypes.arrayOf(
			PropTypes.shape({
				position: PropTypes.shape({ lat: PropTypes.number, lng: PropTypes.number })
			})
		),
		polylineOptions: PropTypes.shape({
			strokeColor: PropTypes.string,
			strokeOpacity: PropTypes.number,
			strokeWeight: PropTypes.number
		})
	}),
	markerOptions: PropTypes.shape({
		infoWindowContent: PropTypes.func
	}),
	readOnly: PropTypes.bool
};

export default Route;
