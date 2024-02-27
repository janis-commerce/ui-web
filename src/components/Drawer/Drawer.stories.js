import React from 'react';
import Drawer from './Drawer';

const control = {
	type: 'select',
	options: ['top', 'right', 'bottom', 'left']
};

export default {
	title: 'Components/Drawer',
	component: Drawer,
	parameters: {
		layout: 'centered'
	},
	argTypes: {
		position: { control }
	}
};

const Template = (args) => {
	return (
		<div
			style={{
				position: 'relative',
				width: '500px',
				height: '500px',
				backgroundColor: '#C4C6CC',
				border: '1px solid black',
				overflow: 'hidden'
			}}
		>
			<Drawer {...args} handleClose={null} />
		</div>
	);
};

const TemplateWithHeader = (args) => {
	const [isOpen, setIsOpen] = React.useState(false);
	const toggleDrawer = () => {
		setIsOpen(!isOpen);
	};

	return (
		<div
			style={{
				width: '1000px',
				height: '600px',
				backgroundColor: '#C4C6CC',
				border: '1px solid black',
				overflow: 'hidden'
			}}
		>
			<div
				style={{
					display: 'flex',
					justifyContent: 'center',
					alignItems: 'center',
					width: '100%',
					height: '100px',
					backgroundColor: '#5393FF',
					color: '#FFFFFF',
					fontWeight: 'bold',
					textTransform: 'uppercase'
				}}
			>
				Header
			</div>
			<div style={{ position: 'relative', height: '500px' }}>
				<div>
					<button onClick={toggleDrawer}>abrir</button>
				</div>
				<Drawer {...args} open={isOpen} handleClose={toggleDrawer}>
					<div style={{ display: 'flex', flexDirection: 'column' }}>
						<div style={{ marginTop: '10px' }}>
							<span style={{ display: 'block', marginBottom: '10px' }}>Conductor</span>
							<select>
								<option value="">Opción 1</option>
								<option value="">Opción 2</option>
								<option value="">Opción 3</option>
							</select>
						</div>
						<div style={{ marginTop: '10px' }}>
							<span style={{ display: 'block', marginBottom: '10px' }}>Tienda</span>
							<select>
								<option value="">Opción 1</option>
								<option value="">Opción 2</option>
								<option value="">Opción 3</option>
							</select>
						</div>
						<div style={{ marginTop: '10px' }}>
							<span style={{ display: 'block', marginBottom: '10px' }}>Fecha</span>
							<select>
								<option value="">Opción 1</option>
								<option value="">Opción 2</option>
								<option value="">Opción 3</option>
							</select>
						</div>
					</div>
					<div style={{ marginTop: '30px' }}>
						<button>Agregar</button>
					</div>
				</Drawer>
			</div>
		</div>
	);
};

const baseArgs = {
	open: false,
	position: 'right',
	handleClose: () => {},
	transitionDuration: 500,
	children: 'This is a drawer'
};

export const Base = Template.bind({});
export const WithHeader = TemplateWithHeader.bind({});

Base.args = {
	...baseArgs
};

WithHeader.args = {
	...baseArgs
};
