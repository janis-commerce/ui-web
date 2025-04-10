import React, { useState } from 'react';
import { Marker as MarkerComponent, OverlayView } from '@react-google-maps/api';
import { debounce } from 'utils';
import PropTypes from 'prop-types';
import InfoWindow from './components/InfoWindow';

const Marker = ({ markerData = {}, markerOptions = {}, readOnly = true }) => {
	const { icon, position, overlay, infoWindowChildren, isDraggable } = markerData || {};

	const {
		onLoad = () => {},
		onClick = () => {},
		onDragStart = () => {},
		onDragEnd = () => {}
	} = markerOptions;

	const [infoWindowOpen, setInfoWindowOpen] = useState(false);
	const [mouseOverInfoWindow, setMouseOverInfoWindow] = useState(false);

	const openInfoWindow = () => setInfoWindowOpen(true);
	const closeInfoWindow = () => setInfoWindowOpen(false);

	const delayedInfoWindowHover = debounce(() => {
		if (!mouseOverInfoWindow) closeInfoWindow();
	}, 100);

	const markerProps = {
		position,
		draggable: isDraggable || !readOnly,
		icon,
		onLoad: (markerInstance) => onLoad(markerData, markerInstance),
		onClick: (eventData) => onClick(markerData, eventData),
		onDragEnd: (eventData) => onDragEnd(markerData, eventData),
		onDragStart: (eventData) => onDragStart(markerData, eventData),
		onMouseOver: () => openInfoWindow(),
		onMouseOut: () => delayedInfoWindowHover()
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
			{overlay && (
				<OverlayView
					className="google-map-component__overlay-view"
					position={position}
					mapPaneName={OverlayView.OVERLAY_MOUSE_TARGET}
					getPixelPositionOffset={(width) => getPixelPositionOffset(width)}
				>
					{overlay()}
				</OverlayView>
			)}
			{infoWindowOpen && infoWindowChildren && (
				<InfoWindow
					className="google-map-component__info-window"
					data={position}
					infoWindowHandles={infoWindowHandles}
				>
					{infoWindowChildren()}
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
		onDragEnd: PropTypes.func,
		onDragStart: PropTypes.func,
		onClick: PropTypes.func
	}),
	markerOptions: PropTypes.shape({}),
	readOnly: PropTypes.bool,
	markerIdx: PropTypes.number,
	markerProps: PropTypes.shape({}),
	children: PropTypes.element
};

export default React.memo(Marker, (prev, next) => {
	const serializedPrev = JSON.stringify(prev);
	const serializedNext = JSON.stringify(next);
	return serializedPrev === serializedNext;
});
