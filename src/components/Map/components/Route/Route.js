import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Marker from '../Marker';
import { Polyline } from '@react-google-maps/api';
import { getRouteDirections } from 'components/Map/utils/getDirections';

const Route = ({ readOnly, setMarker, routeData, saveRouteData, googleMapsApiKey }) => {
	const [polylines, setPolylines] = useState([]);

	useEffect(() => {
		getRouteDirections({
			routeData,
			saveRouteData,
			googleMapsApiKey,
			setPolylines
		});
	}, [routeData]);

	return (
		<>
			{routeData.points.map((point, idx) => (
				<Marker
					markerData={{ ...point }}
					key={idx}
					readOnly={readOnly}
					markerIdx={idx}
					setMarkerCallback={setMarker}
				/>
			))}
			<Polyline path={polylines} options={routeData.polylineOptions} />
		</>
	);
};

Route.propTypes = {
	routeData: PropTypes.shape({
		drawRoute: PropTypes.bool,
		points: PropTypes.arrayOf({ lat: PropTypes.number, lng: PropTypes.number }),
		polylineOptions: PropTypes.shape({
			strokeColor: PropTypes.string,
			strokeOpacity: PropTypes.number,
			strokeWeight: PropTypes.number
		})
	}),
	readOnly: PropTypes.bool,
	setMarker: PropTypes.func,
	saveRouteData: PropTypes.func,
	googleMapsApiKey: PropTypes.string
};

export default Route;
