import React, { useState, useEffect } from 'react';
import Button from 'components/Button';
import Map from './Map';
import {
	animatedMarkersMock,
	multiRoutesMarkersMock,
	markersWithInfoWindow
} from './stories-mocks';

const center = {
	lat: -34.5681233,
	lng: -58.4373331
};

export default {
	title: 'Components/Map',
	component: Map,
	parameters: {
		layout: 'centered'
	},
	argTypes: {}
};

const Template = (args) => <Map {...args} />;

const WithMarkerOptionsTemplate = (args) => {
	const changeHandlerInfo = (info) => {
		document.querySelector('.eventHandlerInfo').textContent = info;
	};

	const onLoad = () => changeHandlerInfo('onLoad event');

	const onClick = ({ marker }) => {
		const { position } = marker;
		changeHandlerInfo(
			`onClick event | Clicked on marker at position ${position?.lat}, ${position?.lng}`
		);
	};

	const onDragStart = ({ marker }) => {
		const { position } = marker;
		changeHandlerInfo(`onDragStart event | ${position}`);
	};

	const onDrag = (event = {}) => {
		const {
			latLng: { lat, lng }
		} = event;
		changeHandlerInfo(`onDrag event | ${lat()}, ${lng()}`);
	};

	const onDragEnd = ({ marker }) => {
		const { position } = marker;
		changeHandlerInfo(`onDragEnd event | New position: ${position?.lat}, ${position?.lng}`);
	};

	return (
		<>
			<Map {...args} markerOptions={{ onLoad, onClick, onDragStart, onDrag, onDragEnd }} />
			<div
				className="eventHandlerInfo"
				style={{
					marginTop: '30px',
					padding: '20px 0',
					textAlign: 'center',
					borderTop: '1px solid grey'
				}}
			/>
		</>
	);
};

const WithInfoWindowTemplate = (args) => {
	const { markers, markerOptions } = args;

	const [selectedPoint, setSelectedPoint] = useState('');
	const [updatedMarkers, setUpdatedMarkers] = useState(markers);

	useEffect(() => {
		setUpdatedMarkers(
			updatedMarkers.map((marker) => {
				return {
					...marker,
					points: marker.points.map((point) => ({
						...point,
						showInfoWindow: point.id === selectedPoint
					}))
				};
			})
		);
	}, [selectedPoint]);

	const handleCloseAllInfoWindows = () => setSelectedPoint('');

	const handleToggleInfoWindow = (pointId) =>
		setSelectedPoint((prev) => (prev === pointId ? '' : pointId));

	return (
		<div style={{ display: 'flex', gap: '10px' }}>
			<div style={{ width: '20%', maxHeight: '400px', overflow: 'auto' }}>
				{updatedMarkers.map((marker = {}, idx) => (
					<div
						key={`${idx.toString()}`}
						style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}
					>
						<h3>Marker {`${(idx + 1).toString()}`}</h3>
						{marker.points.map((point, idx) => (
							<Button
								key={`${idx.toString()}`}
								variant="outlined"
								onClick={() => handleToggleInfoWindow(point.id)}
							>
								{point.position.lat}, {point.position.lng}
							</Button>
						))}
					</div>
				))}
			</div>
			<Map
				{...args}
				markers={updatedMarkers}
				markerOptions={{
					...markerOptions,
					onInfoWindowChange: handleCloseAllInfoWindows,
					infoWindowContent: () => <div>Info window content</div>
				}}
			/>
		</div>
	);
};

const baseArgs = {
	center,
	markers: multiRoutesMarkersMock,
	googleMapsApiKey: ''
};
export const OnlyMap = Template.bind({});
export const HiddenInfo = Template.bind({});
export const WithMarkerOptions = WithMarkerOptionsTemplate.bind({});
export const WithAnimatedMarkers = Template.bind({});
export const MarkersWithInfoWindow = WithInfoWindowTemplate.bind({});

OnlyMap.args = {
	...baseArgs
};

HiddenInfo.args = {
	...baseArgs,
	options: {
		showSearchBar: false,
		zoomControl: false,
		poiRules: [
			{
				featureType: 'road',
				stylers: [{ visibility: 'on' }, { saturation: 0 }, { lightness: 0 }]
			},

			{
				featureType: 'poi',
				stylers: [{ visibility: 'off' }]
			},

			{
				featureType: 'poi.business',
				stylers: [{ visibility: 'off' }]
			},
			{
				featureType: 'poi.park',
				stylers: [{ visibility: 'off' }]
			},

			{
				featureType: 'administrative.locality',
				stylers: [{ visibility: 'on' }, { saturation: 0 }, { lightness: 0 }]
			}
		]
	}
};

WithMarkerOptions.args = {
	...baseArgs,
	options: {
		readOnly: false
	}
};

WithAnimatedMarkers.args = {
	...baseArgs,
	markers: animatedMarkersMock
};

MarkersWithInfoWindow.args = {
	...baseArgs,
	markers: markersWithInfoWindow
};
