import React from 'react';
import ReactDOM from 'react-dom';
import { Chip } from '../src/components';
import Color from '../src/components/Color';
import Icon from '../src/components/Icon';
import Button from 'components/Button';

const Component = () => (
	<div style={{ display: 'flex', justifyContent: 'space-evenly' }}>
		<Button variant="cleaned">BUTTON</Button>
		<Button variant="outlined">BUTTON</Button>
		<Button variant="contained">BUTTON</Button>
	</div>
);

ReactDOM.render(<Component />, document.getElementById('root'));
