/* eslint-disable react/prop-types */
import React from 'react';
import DiagramCanvas from '../DiagramCanvas';
import { nodeComponents } from './components';
import { PRIMARY, SECONDARY_DEEP } from './mock';
import meta from './meta';

export default { ...meta, title: 'Components/DiagramCanvas/Edges' };

// Estilos de edges — las cuatro combinaciones de lineType, animated, arrowStart/End.
// Demostra cómo se ven step, curved y straight, con y sin flechas y animación.
export const EdgeStyles = () => {
	const nodes = [
		{ id: 'a1', type: 'cd', position: { x: 0, y: 0 }, data: { label: 'A1' } },
		{ id: 'a2', type: 'cd', position: { x: 320, y: 0 }, data: { label: 'A2' } },
		{ id: 'b1', type: 'cd', position: { x: 0, y: 120 }, data: { label: 'B1' } },
		{ id: 'b2', type: 'cd', position: { x: 320, y: 120 }, data: { label: 'B2' } },
		{ id: 'c1', type: 'cd', position: { x: 0, y: 240 }, data: { label: 'C1' } },
		{ id: 'c2', type: 'cd', position: { x: 320, y: 240 }, data: { label: 'C2' } },
		{ id: 'd1', type: 'cd', position: { x: 0, y: 360 }, data: { label: 'D1' } },
		{ id: 'd2', type: 'cd', position: { x: 320, y: 360 }, data: { label: 'D2' } }
	];
	const edges = [
		{
			id: 'e-step',
			source: 'a1',
			target: 'a2',
			sourceHandle: 'right',
			targetHandle: 'left',
			lineType: 'step',
			animated: true,
			label: 'step + animated',
			arrowEnd: { type: 'contained' },
			style: { stroke: PRIMARY, strokeWidth: 2 },
			selectedStyle: { stroke: PRIMARY, strokeWidth: 3 }
		},
		{
			id: 'e-curved',
			source: 'b1',
			target: 'b2',
			sourceHandle: 'right',
			targetHandle: 'left',
			lineType: 'curved',
			label: 'curved (default)',
			arrowEnd: { type: 'outlined' },
			style: { stroke: SECONDARY_DEEP, strokeWidth: 2 },
			selectedStyle: { stroke: SECONDARY_DEEP, strokeWidth: 3 }
		},
		{
			id: 'e-straight',
			source: 'c1',
			target: 'c2',
			sourceHandle: 'right',
			targetHandle: 'left',
			lineType: 'straight',
			label: 'straight',
			arrowStart: { type: 'outlined' },
			arrowEnd: { type: 'outlined' },
			style: { stroke: '#888', strokeWidth: 2 },
			selectedStyle: { stroke: '#333', strokeWidth: 3 }
		},
		{
			id: 'e-no-arrow',
			source: 'd1',
			target: 'd2',
			sourceHandle: 'right',
			targetHandle: 'left',
			lineType: 'step',
			label: 'sin flechas',
			style: { stroke: '#ccc', strokeWidth: 2, strokeDasharray: '4 4' },
			selectedStyle: { stroke: '#999', strokeWidth: 3 }
		}
	];

	return (
		<div style={{ width: '100%', height: 500 }}>
			<DiagramCanvas nodes={nodes} edges={edges} nodeComponents={nodeComponents} />
		</div>
	);
};
