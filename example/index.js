import React from 'react';
import ReactDOM from 'react-dom';
import { Chip } from '../src/components';
import Color from '../src/components/Color';
import Icon from '../src/components/Icon';

const Component = () => (
	<div style={{ display: 'flex', justifyContent: 'space-evenly' }}>
		<Chip selected variant="outlined">
			Criterio Tienda
		</Chip>
		<Color color="primary.main"> </Color>
		<Icon name="trash" color="red" />
	</div>
);

ReactDOM.render(<Component />, document.getElementById('root'));
