/* eslint-disable react/prop-types */
import React, { useState, useRef } from 'react';
import DiagramCanvas from '../DiagramCanvas';
import { nodeComponents } from './components';
import { baseNodes, baseEdges, edgeCdCd, edgeCdGrupo, PRIMARY, SECONDARY_DEEP } from './mock';

// ─── Shapes documentadas (se usan en argTypes.table.type.detail) ─────────────

const NODE_SHAPE = `{
  id:           string          // requerido — también usado como CSS id selector (#id)
  type:         string          // requerido — clave en nodeComponents, también usado como CSS class (.type)
  position:     { x, y }        // requerido
  data?:        object          // props que recibe el componente
  width?:       number          // para resize persistido
  height?:      number
  handleConfig?: {
    color?:     string          // color de los handles (default '#b1b1b7')
    positions?: ('top'|'right'|'bottom'|'left')[]  // default: los 4 lados
  }
}`;

const EDGE_SHAPE = `{
  id:            string         // requerido
  source:        string         // requerido — id del nodo origen
  target:        string         // requerido — id del nodo destino
  sourceHandle?: string         // 'top' | 'right' | 'bottom' | 'left'
  targetHandle?: string
  lineType?:     'step' | 'curved' | 'straight'   // default 'curved'
  animated?:     boolean
  label?:        string
  style?:        object         // estilos CSS del trazo (stroke, strokeWidth…)
  selectedStyle?: object        // estilos CSS al estar seleccionado
  arrowStart?:   { type: 'outlined' | 'contained', color?: string }
  arrowEnd?:     { type: 'outlined' | 'contained', color?: string }
  data?:         object         // datos que recibe onEdgeClick
}`;

const NODE_CHANGE_SHAPE = `Array<
  | { type: 'position',   id, position: { x, y } }
  | { type: 'dimensions', id, width, height }
  | { type: 'remove',     id }
>`;

const EDGE_CHANGE_SHAPE = `Array<{ type: 'remove', id }>`;

// ─── Meta ─────────────────────────────────────────────────────────────────────

export default {
	title: 'Components/DiagramCanvas',
	component: DiagramCanvas,
	parameters: { layout: 'padded' },
	argTypes: {
		nodes: {
			control: false,
			description:
				'Nodos del diagrama. El consumidor es dueño de este array — lo inicializa, lo actualiza en `onNodesChange` y lo pasa de vuelta.',
			table: { type: { summary: 'Node[]', detail: NODE_SHAPE } }
		},
		edges: {
			control: false,
			description:
				'Conexiones entre nodos. El consumidor crea edges en `onConnect` y los agrega a su array.',
			table: { type: { summary: 'Edge[]', detail: EDGE_SHAPE } }
		},
		nodeComponents: {
			control: false,
			description:
				'Mapa `{ [type]: ComponenteReact }`. El tipo debe coincidir con `node.type`. El componente recibe `{ data, selected, style }`. Definirlo **fuera del render** para evitar recreaciones.',
			table: {
				type: {
					summary: '{ [type: string]: React.ComponentType }',
					detail: `// Ejemplo:
const MyNode = ({ data, selected }) => <div>...</div>
const nodeComponents = { myType: MyNode }

// El componente recibe:
//   data     — el objeto node.data del consumidor
//   selected — true cuando el nodo está seleccionado
//   style    — { width: '100%', height: '100%' } cuando resizableNodes está activo`
				}
			}
		},
		config: {
			description: 'Configuración del canvas.',
			table: {
				type: {
					summary: 'Config',
					detail: `{
  readOnly?:      boolean  // default true  — deshabilita drag, conexiones y selección
  showControls?:  boolean  // default true  — botones de zoom
  showMiniMap?:   boolean  // default true  — minimapa
  resizableNodes?: boolean // default false — habilita resize de nodos (ver story ResizableNodes)
}`
				},
				defaultValue: {
					summary:
						'{ readOnly: true, showControls: true, showMiniMap: true, resizableNodes: false }'
				}
			}
		},
		onNodesChange: {
			description:
				'Se llama cuando el usuario mueve, redimensiona o elimina nodos. El consumidor aplica los cambios a su array y lo pasa de vuelta como prop.',
			table: {
				type: { summary: '(changes: NodeChange[]) => void', detail: NODE_CHANGE_SHAPE }
			}
		},
		onEdgesChange: {
			description: 'Se llama cuando el usuario elimina un edge.',
			table: {
				type: { summary: '(changes: EdgeChange[]) => void', detail: EDGE_CHANGE_SHAPE }
			}
		},
		onConnect: {
			description:
				'El usuario arrastró entre dos handles. El consumidor crea el edge y lo agrega a su array.',
			table: {
				type: {
					summary: '(connection) => void',
					detail: `({ source, target, sourceHandle, targetHandle }) => void`
				}
			}
		},
		onReconnect: {
			description: 'El usuario arrastró un extremo de un edge existente a otro nodo.',
			table: { type: { summary: '(id, { source, target }) => void' } }
		},
		onNodeClick: {
			description: 'Click en un nodo.',
			table: { type: { summary: '(id: string, data: object) => void' } }
		},
		onEdgeClick: {
			description: 'Click en un edge. `data` es el `edge.data` del consumidor sin `selectedStyle`.',
			table: { type: { summary: '(id: string, data: object) => void' } }
		}
	}
};

// ─── Helpers de UI compartidos ────────────────────────────────────────────────

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

// ─── Stories ──────────────────────────────────────────────────────────────────

// Vista de solo lectura — el canvas no permite drag ni conexiones.
export const ViewMode = () => (
	<div style={{ width: '100%', height: 400 }}>
		<DiagramCanvas nodes={baseNodes} edges={baseEdges} nodeComponents={nodeComponents} />
	</div>
);

// Modo edición completo — drag, conectar, reconectar, eliminar.
// El panel inferior muestra el último evento recibido para que el consumidor
// pueda verificar la forma exacta de cada callback.
export const EditMode = () => {
	const [nodes, setNodes] = useState(baseNodes);
	const [edges, setEdges] = useState(baseEdges);
	const [lastEvent, setLastEvent] = useState(null);

	const handleNodesChange = (changes) => {
		setNodes((prev) =>
			prev
				.filter((n) => !changes.some((c) => c.type === 'remove' && c.id === n.id))
				.map((n) => {
					const posChange = changes.find((c) => c.type === 'position' && c.id === n.id);
					if (posChange) return { ...n, position: posChange.position };
					const dimChange = changes.find((c) => c.type === 'dimensions' && c.id === n.id);
					if (dimChange) return { ...n, width: dimChange.width, height: dimChange.height };
					return n;
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

	const handleConnect = ({ source, target, sourceHandle, targetHandle }) => {
		const sourceNode = nodes.find((n) => n.id === source);
		const targetNode = nodes.find((n) => n.id === target);
		const isCdToCd = sourceNode?.type === 'cd' && targetNode?.type === 'cd';
		const style = isCdToCd ? edgeCdCd : edgeCdGrupo;
		const edge = {
			id: `e-${source}-${target}`,
			source,
			target,
			sourceHandle,
			targetHandle,
			...style
		};
		setEdges((prev) => [...prev, edge]);
		setLastEvent({ type: 'onConnect', payload: { source, target, sourceHandle, targetHandle } });
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
		<div style={{ width: '100%', height: 400 }}>
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

// Estilos de edges — las cuatro combinaciones de lineType, animated, arrowStart/End.
// Demostra cómo se ven step, curved y straight, con y sin flechas y animación.
export const EdgeStyles = () => {
	const nodes = [
		{ id: 'a', type: 'cd', position: { x: 0, y: 80 }, data: { label: 'A' } },
		{ id: 'b', type: 'cd', position: { x: 260, y: 0 }, data: { label: 'B' } },
		{ id: 'c', type: 'cd', position: { x: 260, y: 80 }, data: { label: 'C' } },
		{ id: 'd', type: 'cd', position: { x: 260, y: 160 }, data: { label: 'D' } },
		{ id: 'e', type: 'cd', position: { x: 260, y: 240 }, data: { label: 'E' } }
	];
	const edges = [
		{
			id: 'e-step',
			source: 'a',
			target: 'b',
			lineType: 'step',
			animated: true,
			label: 'step + animated',
			arrowEnd: { type: 'contained', color: PRIMARY },
			style: { stroke: PRIMARY, strokeWidth: 2 },
			selectedStyle: { stroke: PRIMARY, strokeWidth: 3 }
		},
		{
			id: 'e-curved',
			source: 'a',
			target: 'c',
			lineType: 'curved',
			label: 'curved (default)',
			arrowEnd: { type: 'outlined', color: SECONDARY_DEEP },
			style: { stroke: SECONDARY_DEEP, strokeWidth: 2 },
			selectedStyle: { stroke: SECONDARY_DEEP, strokeWidth: 3 }
		},
		{
			id: 'e-straight',
			source: 'a',
			target: 'd',
			lineType: 'straight',
			label: 'straight',
			arrowStart: { type: 'outlined', color: '#888' },
			arrowEnd: { type: 'outlined', color: '#888' },
			style: { stroke: '#888', strokeWidth: 2 },
			selectedStyle: { stroke: '#333', strokeWidth: 3 }
		},
		{
			id: 'e-no-arrow',
			source: 'a',
			target: 'e',
			lineType: 'step',
			label: 'sin flechas',
			style: { stroke: '#ccc', strokeWidth: 2, strokeDasharray: '4 4' },
			selectedStyle: { stroke: '#999', strokeWidth: 3 }
		}
	];

	return (
		<div style={{ width: '100%', height: 340 }}>
			<DiagramCanvas nodes={nodes} edges={edges} nodeComponents={nodeComponents} />
		</div>
	);
};

// handleConfig — personalización de handles por nodo.
// Cada nodo puede tener un color distinto y exponer solo algunos lados.
// Útil para dirigir visualmente las conexiones posibles.
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
		<div style={{ width: '100%', height: 280 }}>
			<DiagramCanvas nodes={nodes} edges={[]} nodeComponents={nodeComponents} />
		</div>
	);
};

// API del ref — control imperativo del viewport.
// El consumidor puede hacer zoom a un nodo, a un edge, o controlar el viewport
// sin necesidad de pasar props adicionales.
export const RefAPI = () => {
	const canvasRef = useRef();

	return (
		<div>
			<div style={{ marginBottom: 8 }}>
				<button style={btnStyle} onClick={() => canvasRef.current?.zoomToNode('wh-cordoba')}>
					zoomToNode
				</button>
				<button style={btnStyle} onClick={() => canvasRef.current?.zoomToEdge('e-1')}>
					zoomToEdge
				</button>
				<button style={btnStyle} onClick={() => canvasRef.current?.fitView()}>
					fitView
				</button>
				<button style={btnStyle} onClick={() => canvasRef.current?.zoomIn()}>
					zoomIn
				</button>
				<button style={btnStyle} onClick={() => canvasRef.current?.zoomOut()}>
					zoomOut
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
