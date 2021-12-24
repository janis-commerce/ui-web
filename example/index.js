import React from 'react';
import ReactDOM from 'react-dom';
import { Chip } from '../src/components';
import Color from '../src/components/Color';
import Icon from '../src/components/Icon';
import Button from 'components/Button';

const Component = () => (
	<div style={{ display: 'flex', justifyContent: 'space-evenly' }}>
		<Chip selected variant="outlined">
			Criterio Tienda
		</Chip>
		<Color color="primary.main"> </Color>
		<Icon name="trash" color="red" />
		<Button variant="contained">BUTTON</Button>
	</div>
);

ReactDOM.render(<Component />, document.getElementById('root'));
