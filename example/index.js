import React from 'react';
import ReactDOM from 'react-dom';
import { Button, Checkbox, Chip, Color, Icon, Switch } from '../src/components';

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
		</div>
	);
};

ReactDOM.render(<Component />, document.getElementById('root'));
