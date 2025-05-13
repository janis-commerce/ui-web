import React, { useEffect, useRef, useState } from 'react';
import { Marker as MarkerComponent, OverlayView } from '@react-google-maps/api';
import { debounce, isNumber, isObject } from 'utils';
import PropTypes from 'prop-types';
import InfoWindow from './components/InfoWindow';
import { getCoordsFromEvent, markerHasEqualPosition, isValidAnimation } from './utils';

const Marker = ({ markerData = {}, markerOptions = {}, readOnly = true }) => {
	const [marker, setMarker] = useState(markerData);
	const { icon, position, animation, overlay, infoWindowChildren, isDraggable } = marker || {};

	const {
		onLoad = () => {},
		onClick = () => {},
		onDrag = () => {},
		onDragStart = () => {},
		onDragEnd = () => {}
	} = markerOptions;

	const markerRef = useRef(null);
	const timeoutRef = useRef(null);

	const [infoWindowOpen, setInfoWindowOpen] = useState(false);
	const [mouseOverInfoWindow, setMouseOverInfoWindow] = useState(false);

	const openInfoWindow = () => setInfoWindowOpen(true);
	const closeInfoWindow = () => setInfoWindowOpen(false);

	const delayedInfoWindowHover = debounce(() => {
		if (!mouseOverInfoWindow) closeInfoWindow();
	}, 100);

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

	const animate = () => {
		if (!markerRef.current) return;

		if (!isValidAnimation(animation)) return;

		markerRef.current?.marker?.setAnimation(window.google.maps.Animation[animation?.name]);

		if (timeoutRef.current) clearTimeout(timeoutRef.current);

		if (animation?.duration && isNumber(animation?.duration)) {
			timeoutRef.current = setTimeout(() => {
				markerRef.current?.marker?.setAnimation(null);
			}, animation?.duration);
		}
	};

	useEffect(() => {
		if (animation && isObject(animation)) animate();

		return () => {
			if (timeoutRef.current) clearTimeout(timeoutRef.current);
		};
	}, [animation]);

	const markerProps = {
		ref: markerRef,
		position,
		draggable: isDraggable || !readOnly,
		icon,
		onLoad: (instance) => onLoad({ prevMarker: marker, instance }),
		onClick: (event) => onClick(getEventHandlerData(event)),
		onDrag: (event) => onDrag(event),
		onDragEnd: (event) => onDragEnd(getEventHandlerData(event)),
		onDragStart: (event) => onDragStart(getEventHandlerData(event)),
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
