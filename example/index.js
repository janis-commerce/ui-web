import React from 'react';
import ReactDOM from 'react-dom';
import { Chip } from '../src/web/components';
import Color from '../src/web/components/Color';

const Component = () => <Color color="red" />;

ReactDOM.render(<Component />, document.getElementById('root'));
