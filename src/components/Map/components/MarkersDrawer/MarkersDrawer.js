import React from 'react';
import PropTypes from 'prop-types';
import { MarkerComponent as Marker } from '../Marker/Marker';
import Routes from '../Route';
import Locations from '../Locations';

const MarkerDrawer = ({ markers, readOnly, setMarker }) => {
    const getPolylines = () => {};
    
	return (
		<>
			{markers.map(marker => marker.drawRoute ? <Route /> : <Locations />)}
		</>
	);
};

MarkerDrawer.propTypes = {
	markers: PropTypes.arrayOf({}),
	readOnly: PropTypes.bool,
	setMarker: PropTypes.func({})
};

export default MarkerDrawer;

{markers.flatMap((marker, idx) =>
    marker.points.map((point, idx2) => (
        <Marker
            markerData={{ ...point }}
            key={idx + idx2}
            readOnly={readOnly}
            markerIdx={idx}
            setMarkerCallback={setMarker}
        />
        {polylines.map((polyline, idx) => (
            <Polyline path={polyline} key={idx} options={markers[idx].polylineOptions} />
        ))}
    ))
)}
