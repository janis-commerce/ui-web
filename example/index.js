import React from 'react';
import ReactDOM from 'react-dom';
import { Button, Checkbox, Chip, Color, Icon, Switch, Input, Textarea } from '../src/components';

const Component = () => {
	return (
		<div style={{ display: 'flex', justifyContent: 'space-evenly' }}>
			<Switch />
			<Checkbox />
			<Chip selected variant="outlined">
				Criterio Tienda
			</Chip>
			<Color color="primary.main"> </Color>
			<Icon name="trash" color="red" />
			<Button variant="contained">BUTTON</Button>
			<Input label="el label" />
			<Textarea label="label" hasFloatingLabel />
		</div>
	);
};

ReactDOM.render(<Component />, document.getElementById('root'));
