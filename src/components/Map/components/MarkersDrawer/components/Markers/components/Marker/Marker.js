import React, { useState } from 'react';
import { Marker as MarkerComponent, OverlayView } from '@react-google-maps/api';
import { debounce } from 'utils';
import PropTypes from 'prop-types';
import InfoWindow from './components/InfoWindow';

const Marker = ({
	markerData,
	readOnly,
	setMarkerCallback = () => {},
	markerIdx,
	markerProps: schemaMarkerProps
}) => {
	const { onClick } = schemaMarkerProps || {};

	const [infoWindowOpen, setInfoWindowOpen] = useState(false);
	const [mouseOverInfoWindow, setMouseOverInfoWindow] = useState(false);

	const openInfoWindow = () => setInfoWindowOpen(true);
	const closeInfoWindow = () => setInfoWindowOpen(false);

	const delayedInfoWindowHover = debounce(() => {
		if (!mouseOverInfoWindow) closeInfoWindow();
	}, 100);

	const markerHandles = {
		...(onClick && { onClick: () => onClick(markerData) }),
		onMouseOver: () => openInfoWindow(),
		onMouseOut: () => delayedInfoWindowHover()
	};

	const markerProps = {
		position: markerData.position,
		draggable: !readOnly,
		onDragEnd: ({ latLng }) => setMarkerCallback(latLng, markerIdx, markerData),
		...(true && { ...markerHandles }),
		icon: markerData.icon
	};

	const infoWindowHandles = {
		onMouseEnter: () => {
			delayedInfoWindowHover.cancel();
			setMouseOverInfoWindow(true);
		},
		onMouseLeave: () => {
			closeInfoWindow();
			setMouseOverInfoWindow(false);
		}
	};

	const getPixelPositionOffset = (width) => {
		if (width) {
			return {
				x: -(width / 2),
				y: 0
			};
		}
		return {
			x: -68,
			y: 0
		};
	};

	return (
		<>
			<MarkerComponent {...markerProps} />
			{markerData.overlay && (
				<OverlayView
					className="google-map-component__overlay-view"
					position={markerData.position}
					mapPaneName={OverlayView.OVERLAY_MOUSE_TARGET}
					getPixelPositionOffset={(width, height) => getPixelPositionOffset(width, height)}
				>
					{markerData.overlay()}
				</OverlayView>
			)}
			{infoWindowOpen && markerData.infoWindowChildren && (
				<InfoWindow
					className="google-map-component__info-window"
					data={markerData.position}
					infoWindowHandles={infoWindowHandles}
				>
					{markerData.infoWindowChildren()}
				</InfoWindow>
			)}
		</>
	);
};

Marker.propTypes = {
	markerData: PropTypes.shape({
		overlay: PropTypes.element,
		icon: PropTypes.shape({}),
		infoWindowChildren: PropTypes.shape({}),
		position: PropTypes.shape({})
	}),
	readOnly: PropTypes.bool,
	setMarkerCallback: PropTypes.func,
	markerIdx: PropTypes.number,
	markerProps: PropTypes.shape({}),
	children: PropTypes.element
};

export default Marker;
