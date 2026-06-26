/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import DiagramCanvas from '../DiagramCanvas';
import { nodeComponents } from './components';
import { baseNodes, baseEdges, PRIMARY, SECONDARY_DEEP } from './mock';
import meta from './meta';

export default { ...meta, title: 'Components/DiagramCanvas/Nodes' };

// Resize de nodos — habilitado con config.resizableNodes.
// El nodo recibe `style: { width: '100%', height: '100%' }` cuando tiene dimensiones
// asignadas; el componente debe aplicarlo en su div raíz para ocupar el espacio.
// Seleccioná un nodo para ver los handles de resize.
export const ResizableNodes = () => {
	const [nodes, setNodes] = useState(baseNodes);

	const handleNodesChange = (changes) => {
		setNodes((prev) =>
			prev.map((n) => {
				const dimChange = changes.find((c) => c.type === 'dimensions' && c.id === n.id);
				return dimChange ? { ...n, width: dimChange.width, height: dimChange.height } : n;
			})
		);
	};

	return (
		<div style={{ width: '100%', height: 500 }}>
			<DiagramCanvas
				nodes={nodes}
				edges={baseEdges}
				nodeComponents={nodeComponents}
				config={{ readOnly: false, resizableNodes: true }}
				onNodesChange={handleNodesChange}
			/>
		</div>
	);
};

// Configuración de handles por nodo — color y posiciones disponibles para conectar.
export const HandleConfig = () => {
	const nodes = [
		{
			id: 'n1',
			type: 'cd',
			position: { x: 0, y: 60 },
			handleConfig: { color: PRIMARY, positions: ['right'] },
			data: { label: 'Solo derecha' }
		},
		{
			id: 'n2',
			type: 'cd',
			position: { x: 240, y: 0 },
			handleConfig: { color: SECONDARY_DEEP, positions: ['left', 'bottom'] },
			data: { label: 'Izq + abajo' }
		},
		{
			id: 'n3',
			type: 'cd',
			position: { x: 240, y: 140 },
			data: { label: 'Los 4 lados (default)' }
		}
	];

	return (
		<div style={{ width: '100%', height: 500 }}>
			<DiagramCanvas nodes={nodes} edges={[]} nodeComponents={nodeComponents} />
		</div>
	);
};
