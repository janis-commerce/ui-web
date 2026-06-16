/* eslint-disable react/prop-types */
import React, { useState, useRef } from 'react';
import DiagramCanvas from '../DiagramCanvas';
import { nodeComponents } from './components';
import { baseNodes, baseEdges, edgeCdCd, edgeCdGrupo, PRIMARY } from './mock';

export default {
	title: 'Components/DiagramCanvas',
	component: DiagramCanvas,
	parameters: { layout: 'padded' },
	argTypes: {
		adapter: { table: { disable: true } },
		nodes: {
			control: false,
			description:
				'Array de nodos. Cada nodo requiere `id`, `type` (clave en `nodeComponents`) y `position: { x, y }`. Opcional: `handleConfig: { color, positions }` y `data` con datos de negocio.',
			table: { type: { summary: 'Node[]' } }
		},
		edges: {
			control: false,
			description:
				'Array de conexiones. Cada edge requiere `id`, `source` y `target`. Opcional: `lineType` (`step | curved | straight`), `animated`, `label`, `style`, `selectedStyle`, `arrowStart`, `arrowEnd` y `data`.',
			table: { type: { summary: 'Edge[]' } }
		},
		nodeComponents: {
			control: false,
			description:
				'Mapa `{ [type]: ComponenteReact }`. El componente recibe `{ data, selected }`. Definirlo fuera del render para evitar recreaciones.',
			table: { type: { summary: 'object' } }
		},
		config: {
			description:
				'Objeto de configuración del canvas. Claves: `readOnly` (default `true`), `showControls` (default `true`), `showMiniMap` (default `true`).',
			table: {
				type: { summary: '{ readOnly?, showControls?, showMiniMap? }' },
				defaultValue: { summary: '{ readOnly: true, showControls: true, showMiniMap: true }' }
			}
		},
		onConnect: {
			description:
				'Se llama cuando el usuario conecta dos nodos. Recibe `{ source, target }`. Debe retornar el edge completo a agregar, o `undefined` para cancelar.',
			table: { type: { summary: '({ source, target }) => Edge | undefined' } }
		},
		onReconnect: {
			description:
				'Se llama cuando el usuario redirige un edge existente. Recibe `(id, { source, target })`.',
			table: { type: { summary: '(id, { source, target }) => void' } }
		},
		onNodesChange: {
			description:
				'Se llama cuando el usuario mueve o elimina nodos (solo en `readOnly: false`). Recibe un array de cambios con `type: "position" | "remove"`.',
			table: { type: { summary: '(changes: NodeChange[]) => void' } }
		},
		onEdgesChange: {
			description:
				'Se llama cuando el usuario elimina edges (solo en `readOnly: false`). Recibe un array de cambios con `type: "remove"`.',
			table: { type: { summary: '(changes: EdgeChange[]) => void' } }
		},
		onNodeClick: {
			description: 'Se llama cuando el usuario hace click en un nodo. Recibe `(id, data)`.',
			table: { type: { summary: '(id: string, data: object) => void' } }
		},
		onEdgeClick: {
			description: 'Se llama cuando el usuario hace click en un edge. Recibe `(id, data)`.',
			table: { type: { summary: '(id: string, data: object) => void' } }
		}
	}
};

export const ViewMode = () => (
	<div style={{ width: '100%', height: 400 }}>
		<DiagramCanvas nodes={baseNodes} edges={baseEdges} nodeComponents={nodeComponents} />
	</div>
);

const eventCardStyle = {
	marginTop: 12,
	padding: '10px 14px',
	background: '#f8f9fc',
	border: '1px solid #e0e6f0',
	borderRadius: 8,
	fontSize: 12,
	fontFamily: 'monospace',
	color: '#001233'
};

const eventLabelStyle = {
	fontWeight: 700,
	marginBottom: 4,
	color: '#7588a3',
	fontSize: 11,
	textTransform: 'uppercase',
	letterSpacing: 1
};

export const EditMode = () => {
	const [nodes, setNodes] = useState(baseNodes);
	const [edges, setEdges] = useState(baseEdges);
	const [lastEvent, setLastEvent] = useState(null);

	const handleNodesChange = (changes) => {
		setNodes((prev) =>
			prev
				.filter((n) => !changes.some((c) => c.type === 'remove' && c.id === n.id))
				.map((n) => {
					const change = changes.find((c) => c.type === 'position' && c.id === n.id);
					return change ? { ...n, position: change.position } : n;
				})
		);
		setLastEvent({ type: 'onNodesChange', payload: changes });
	};

	const handleEdgesChange = (changes) => {
		setEdges((prev) =>
			prev.filter((e) => !changes.some((c) => c.type === 'remove' && c.id === e.id))
		);
		setLastEvent({ type: 'onEdgesChange', payload: changes });
	};

	const handleConnect = ({ source, target }) => {
		const sourceNode = nodes.find((n) => n.id === source);
		const targetNode = nodes.find((n) => n.id === target);
		const isCdToCd = sourceNode?.type === 'cd' && targetNode?.type === 'cd';
		const style = isCdToCd ? edgeCdCd : edgeCdGrupo;
		const edge = { id: `e-${source}-${target}`, source, target, ...style };
		setEdges((prev) => [...prev, edge]);
		setLastEvent({ type: 'onConnect', payload: { source, target } });
		return edge;
	};

	const handleReconnect = (id, { source, target }) => {
		setEdges((prev) => prev.map((e) => (e.id === id ? { ...e, source, target } : e)));
		setLastEvent({ type: 'onReconnect', payload: { id, source, target } });
	};

	return (
		<div style={{ width: '100%' }}>
			<div style={{ height: 400 }}>
				<DiagramCanvas
					nodes={nodes}
					edges={edges}
					nodeComponents={nodeComponents}
					config={{ readOnly: false }}
					onNodesChange={handleNodesChange}
					onEdgesChange={handleEdgesChange}
					onConnect={handleConnect}
					onReconnect={handleReconnect}
					onNodeClick={(id, data) => setLastEvent({ type: 'onNodeClick', payload: { id, data } })}
					onEdgeClick={(id, data) => setLastEvent({ type: 'onEdgeClick', payload: { id, data } })}
				/>
			</div>
			{lastEvent && (
				<div style={eventCardStyle}>
					<div style={eventLabelStyle}>{lastEvent.type}</div>
					<pre style={{ margin: 0, whiteSpace: 'pre-wrap' }}>
						{JSON.stringify(lastEvent.payload, null, 2)}
					</pre>
				</div>
			)}
		</div>
	);
};

const btnStyle = {
	padding: '6px 12px',
	marginRight: 8,
	background: PRIMARY,
	color: '#fff',
	border: 'none',
	borderRadius: 6,
	cursor: 'pointer',
	fontSize: 12
};

export const ZoomAPI = () => {
	const canvasRef = useRef();

	return (
		<div>
			<div style={{ marginBottom: 8 }}>
				<button style={btnStyle} onClick={() => canvasRef.current?.zoomToNode('wh-cordoba')}>
					Zoom Córdoba
				</button>
				<button style={btnStyle} onClick={() => canvasRef.current?.zoomToNode('gt-norte')}>
					Zoom BsAs Norte
				</button>
				<button style={btnStyle} onClick={() => canvasRef.current?.zoomToEdge('e-1')}>
					Zoom edge e-1
				</button>
				<button style={btnStyle} onClick={() => canvasRef.current?.fitView()}>
					Fit view
				</button>
				<button style={btnStyle} onClick={() => canvasRef.current?.zoomIn()}>
					Zoom in
				</button>
				<button style={btnStyle} onClick={() => canvasRef.current?.zoomOut()}>
					Zoom out
				</button>
			</div>
			<div style={{ width: '100%', height: 400 }}>
				<DiagramCanvas
					ref={canvasRef}
					nodes={baseNodes}
					edges={baseEdges}
					nodeComponents={nodeComponents}
				/>
			</div>
		</div>
	);
};
