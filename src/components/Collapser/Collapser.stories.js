import React from 'react';
import palette from 'theme/palette';
import Collapser from './Collapser';
import Chip from 'components/Chip';

export default {
	title: 'Components/Collapser',
	component: Collapser,
	parameters: {
		layout: 'centered'
	},
	args: {
		'toggleIcon.iconNames.opened': 'minus_big_light',
		'toggleIcon.iconNames.closed': 'plus_big_light',
		'toggleIcon.color': 'blue',
		'toggleIcon.position': 'left'
	},
	argTypes: {
		toggleIcon: {
			table: {
				disable: true
			}
		},
		'toggleIcon.iconNames.closed': {
			name: 'Closed',
			description: 'Nombre del icono cuando está cerrado',
			control: 'select',
			options: ['plus_big_light', 'arrow_down_flat'],
			table: {
				category: 'toggleIcon',
				subcategory: 'iconNames'
			}
		},
		'toggleIcon.iconNames.opened': {
			name: 'Opened',
			control: 'select',
			description: 'Nombre del icono cuando está abierto',
			options: ['minus_big_light', 'arrow_up_flat'],
			table: {
				category: 'toggleIcon',
				subcategory: 'iconNames'
			}
		},
		'toggleIcon.color': {
			name: 'Color',
			description: 'Color del icono',
			control: 'select',
			options: Object.keys(palette),
			table: {
				category: 'toggleIcon'
			}
		},
		'toggleIcon.position': {
			name: 'Position',
			description: 'Posición del icono',
			control: 'select',
			options: ['left', 'right'],
			table: {
				category: 'toggleIcon'
			}
		}
	}
};

const Template = (args) => {
	const toggleIcon = {
		iconNames: {
			opened: args['toggleIcon.iconNames.opened'],
			closed: args['toggleIcon.iconNames.closed']
		},
		color: args['toggleIcon.color'],
		position: args['toggleIcon.position']
	};

	return (
		<div
			style={{
				width: '1000px',
				minHeight: '350px',
				backgroundColor: palette.grey,
				padding: '20px'
			}}
		>
			<Collapser {...args} toggleIcon={toggleIcon} />
		</div>
	);
};

export const Base = Template.bind({});

Base.args = {
	renderHeader: () => {
		return <div style={{ width: '100%' }}>Header</div>;
	},
	renderContent: () => {
		return <div style={{ width: '100%' }}>Content</div>;
	}
};

export const WithCallbacks = Template.bind({});

WithCallbacks.args = {
	renderHeader: () => (
		<div
			style={{
				width: '100%',
				display: 'flex',
				justifyContent: 'space-between',
				alignItems: 'center'
			}}
		>
			<span>Warehouse</span>
			<Chip>3 deliveries</Chip>
		</div>
	),
	renderContent: () => (
		<div
			style={{
				width: '100%',
				display: 'flex',
				flexDirection: 'column'
			}}
		>
			<div style={{ width: '100%', marginBottom: '10px' }}>
				<span>Delivery 1</span>
			</div>
			<div style={{ width: '100%', marginBottom: '10px' }}>
				<span>Delivery 2</span>
			</div>
			<div style={{ width: '100%' }}>
				<span>Delivery 3</span>
			</div>
		</div>
	),
	contentBorder: false,
	expandStartHandler: () => {
		console.log('expandStartHandler() -> inicio apertura');
	},
	expandingHandler: () => {
		console.log('expandingHandler() -> abriendo');
	},
	expandEndHandler: () => {
		console.log('expandEndHandler() -> fin apertura');
	},
	collapseStartHandler: () => {
		console.log('collapseStartHandler() -> inicio cierre');
	},
	collapsingHandler: () => {
		console.log('collapsingHandler() -> cerrando');
	},
	collapseEndHandler: () => {
		console.log('collapseEndHandler() -> fin cierre');
	}
};
