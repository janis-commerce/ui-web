/* eslint-disable react/prop-types */
import React from 'react';
import DiagramCanvas from '../DiagramCanvas';
import { nodeComponents } from './components';
import { baseNodes, baseEdges } from './mock';
import meta from './meta';

export default { ...meta, title: 'Components/DiagramCanvas/Overview' };

// Vista de solo lectura — el canvas no permite drag ni conexiones.
export const ViewMode = () => (
	<div style={{ width: '100%', height: 500 }}>
		<DiagramCanvas nodes={baseNodes} edges={baseEdges} nodeComponents={nodeComponents} />
	</div>
);
