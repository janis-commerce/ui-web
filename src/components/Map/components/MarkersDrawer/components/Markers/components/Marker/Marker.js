import React, { useEffect, useRef, useState } from 'react';
import { Marker as MarkerComponent, OverlayView } from '@react-google-maps/api';
import { isNumber } from 'utils';
import PropTypes from 'prop-types';
import InfoWindow from './components/InfoWindow';
import { getCoordsFromEvent, isValidAnimation, markerHasEqualPosition } from './utils';

const Marker = ({ markerData = {}, markerOptions = {}, readOnly = true }) => {
	const [marker, setMarker] = useState(markerData);
	const { icon, position, animation, overlay, isDraggable, zIndex, infoWindowOpen } = marker || {};

	const {
		infoWindowContent,
		infoWindowOptions = {},
		onLoad = () => {},
		onClick = () => {},
		onDrag = () => {},
		onDragStart = () => {},
		onDragEnd = () => {},
		onMarkerMouseOver = () => {},
		onMarkerMouseOut = () => {},
		onInfoWindowMouseEnter = () => {},
		onInfoWindowMouseLeave = () => {}
	} = markerOptions;

	const markerRef = useRef(null);
	const timeoutRef = useRef(null);

	useEffect(() => {
		setMarker(markerData);
	}, [markerData]);

	const updateMarker = (newData = {}) => {
		const updatedMarker = { ...marker, ...newData };
		setMarker(updatedMarker);
		return updatedMarker;
	};

	const getEventHandlerData = (event) => {
		const newPosition = getCoordsFromEvent(event);

		return {
			marker: markerHasEqualPosition(marker?.position, newPosition)
				? marker
				: updateMarker({ position: newPosition }),
			prevMarker: marker,
			instance: markerRef.current?.marker
		};
	};

	const stopAnimation = () => {
		if (markerRef.current?.marker) markerRef.current.marker.setAnimation(null);
	};

	const startAnimation = () => {
		if (!markerRef.current) return;

		if (timeoutRef.current) clearTimeout(timeoutRef.current);

		markerRef.current.marker.setAnimation(window.google.maps.Animation[animation?.name]);

		if (animation?.duration && isNumber(animation?.duration)) {
			timeoutRef.current = setTimeout(() => stopAnimation(), animation.duration);
		}
	};

	useEffect(() => {
		if (isValidAnimation(animation)) startAnimation();

		return () => {
			stopAnimation();
		};
	}, [animation]);

	const markerProps = {
		ref: markerRef,
		position,
		draggable: isDraggable || !readOnly,
		icon,
		zIndex,
		onLoad: (instance) => onLoad({ prevMarker: marker, instance }),
		onClick: (event) => onClick(getEventHandlerData(event)),
		onDrag: (event) => onDrag(event),
		onDragEnd: (event) => {
			if (isValidAnimation(animation)) startAnimation();
			onDragEnd(getEventHandlerData(event));
		},
		onDragStart: (event) => onDragStart(getEventHandlerData(event)),
		onMouseOver: () => {
			if (isValidAnimation(animation)) stopAnimation();
			onMarkerMouseOver();
		},
		onMouseOut: () => {
			if (isValidAnimation(animation)) startAnimation();
			onMarkerMouseOut();
		}
	};

	const infoWindowHandles = {
		onMouseEnter: onInfoWindowMouseEnter,
		onMouseLeave: onInfoWindowMouseLeave
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
			{infoWindowOpen && infoWindowContent && (
				<InfoWindow
					className="google-map-component__info-window"
					data={position}
					infoWindowOptions={infoWindowOptions}
					infoWindowHandles={infoWindowHandles}
				>
					{infoWindowContent(markerData)}
				</InfoWindow>
			)}
		</>
	);
};

Marker.propTypes = {
	markerData: PropTypes.shape({
		overlay: PropTypes.element,
		icon: PropTypes.shape({}),
		infoWindowChildren: PropTypes.node,
		position: PropTypes.shape({}),
		isDraggable: PropTypes.bool,
		onDragEnd: PropTypes.func,
		onDragStart: PropTypes.func,
		onClick: PropTypes.func
	}),
	markerOptions: PropTypes.shape({
		infoWindowContent: PropTypes.func
	}),
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
