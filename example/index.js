import React from 'react';
import ReactDOM from 'react-dom';
import {
	Button,
	Checkbox,
	Chip,
	Color,
	Icon,
	Switch,
	Input,
	Textarea,
	Image,
	QRCode,
	ColorPicker,
	HTML
} from '../src/components';

// eslint-disable-next-line react/prop-types
const Container = ({ children }) => (
	<div
		style={{ display: 'flex', marginBottom: '20px', justifyContent: 'space-evenly', width: '50%' }}
	>
		{children}
	</div>
);

const htmlCode = `
	<!DOCTYPE html>
	<html>
		<body>
			<h1>Bienvenido a Janis</h1>
			<br>
			<h2>Mediante el siguiente <a href="{{activactionUrl}}"><strong>link</strong></a> vas a poder ingresar a Janis.</h2>
		</body>
	</html>
`;

const Component = () => {
	return (
		<div>
			<Container>
				<Switch />
				<Checkbox />
			</Container>
			<Container>
				<Chip selected variant="outlined">
					Criterio Tienda
				</Chip>
				<Color color="primary.main"> </Color>
				<Icon name="trash" color="red" />
				<Button variant="contained">BUTTON</Button>
			</Container>
			<Container>
				<Input label="el label" />
				<Textarea label="label" hasFloatingLabel />
			</Container>
			<Container>
				<Image
					url="https://media-exp1.licdn.com/dms/image/C4D0BAQEleP1bEPlHUw/company-logo_200_200/0/1602704789719?e=2147483647&v=beta&t=HK4VlCL2wCnB7kduNn4XXD6xe5qTdEkPhWzqP7KmFjE"
					width={150}
					roundBorders
				/>
				<QRCode value="someValue" />
			</Container>
			<Container>
				<ColorPicker />
				<ColorPicker isCollapsable />
			</Container>
			<Container>
				<HTML sourceURL="https://fizzmod.com" />
				<HTML code={htmlCode} />
			</Container>
		</div>
	);
};

ReactDOM.render(<Component />, document.getElementById('root'));
