import React from 'react';
import PropTypes from 'prop-types';
import { Polyline } from '@react-google-maps/api';
import Markers from '../Markers';

const Route = ({ routeData = {}, readOnly = false, setMarker = () => {} }) => {
	const { polylines = [] } = routeData;
	return (
		<>
			<Markers readOnly={readOnly} setMarker={setMarker} markers={routeData.points} />
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
	readOnly: PropTypes.bool,
	setMarker: PropTypes.func
};

export default Route;
