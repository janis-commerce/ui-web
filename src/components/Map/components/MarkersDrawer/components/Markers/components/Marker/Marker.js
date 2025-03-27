import React, { useState } from 'react';
import { Marker as MarkerComponent, OverlayView } from '@react-google-maps/api';
import { debounce } from 'utils';
import PropTypes from 'prop-types';
import InfoWindow from './components/InfoWindow';

const Marker = ({ markerData, readOnly, markerProps: schemaMarkerProps }) => {
	const { onClick } = schemaMarkerProps || {};

	const [infoWindowOpen, setInfoWindowOpen] = useState(false);
	const [mouseOverInfoWindow, setMouseOverInfoWindow] = useState(false);

	const openInfoWindow = () => setInfoWindowOpen(true);
	const closeInfoWindow = () => setInfoWindowOpen(false);

	const delayedInfoWindowHover = debounce(() => {
		if (!mouseOverInfoWindow) closeInfoWindow();
	}, 100);

	const markerProps = {
		position: markerData.position,
		draggable: markerData.isDraggable || !readOnly,
		icon: markerData.icon,
		onDragEnd: markerData.dragEnd,
		onDragStart: markerData.dragStart,
		onMouseOver: () => openInfoWindow(),
		onMouseOut: () => delayedInfoWindowHover(),
		...(onClick && { onClick: () => onClick(markerData) })
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

	const getPixelPositionOffset = (width) => ({ x: width ? -(width / 2) : -68, y: 0 });

	return (
		<>
			<MarkerComponent {...markerProps} />
			{markerData.overlay && (
				<OverlayView
					className="google-map-component__overlay-view"
					position={markerData.position}
					mapPaneName={OverlayView.OVERLAY_MOUSE_TARGET}
					getPixelPositionOffset={(width) => getPixelPositionOffset(width)}
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
		position: PropTypes.shape({}),
		isDraggable: PropTypes.bool,
		dragEnd: PropTypes.func,
		dragStart: PropTypes.func
	}),
	readOnly: PropTypes.bool,
	setMarkerCallback: PropTypes.func,
	markerIdx: PropTypes.number,
	markerProps: PropTypes.shape({}),
	children: PropTypes.element
};

export default Marker;
