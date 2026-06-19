/* eslint-disable react/prop-types */
import React, { useState, useRef } from 'react';
import DiagramCanvas from '../DiagramCanvas';
import { nodeComponents } from './components';
import { baseNodes, baseEdges, edgeCdCd, edgeCdGrupo, PRIMARY, SECONDARY_DEEP } from './mock';

// ─── Shapes documentadas (se usan en argTypes.table.type.detail) ─────────────

const NODE_SHAPE = `{
  id:           string          // requerido
  type:         string          // requerido — clave en nodeComponents
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
  data?:         object         // datos de negocio que recibe onEdgeClick
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
		},
		onBeforeDelete: {
			description:
				'Intercepta el borrado antes de que ocurra (tecla Delete/Backspace). Async: retornar `false` cancela el borrado. Ver story DeleteWithConfirm.',
			table: {
				type: {
					summary: '({ nodes, edges }) => Promise<boolean>',
					detail: `async ({ nodes, edges }) => {
  // nodes/edges: elementos que se van a borrar (formato de dominio)
  return window.confirm('¿Eliminar?'); // false cancela
}`
				}
			}
		},
		onSelectionChange: {
			description: 'Se llama cuando cambia la selección. Ver story ExternalAction.',
			table: {
				type: {
					summary: '({ nodes, edges }) => void',
					detail: `({ nodes: [{ id }], edges: [{ id }] }) => void`
				}
			}
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
	const [selection, setSelection] = useState({ nodes: [], edges: [] });
	const counterRef = React.useRef(0);

	const getDropPosition = (currentNodes) => {
		if (!currentNodes.length) return { x: 200, y: 200 };
		const centerX =
			currentNodes.reduce((sum, node) => sum + node.position.x, 0) / currentNodes.length;
		const centerY =
			currentNodes.reduce((sum, node) => sum + node.position.y, 0) / currentNodes.length;
		const offset = (counterRef.current % 5) * 40 - 80;
		return { x: centerX + offset, y: centerY + offset };
	};

	const handleNodesChange = (changes) => {
		setNodes((prev) =>
			prev
				.filter(
					(node) => !changes.some((change) => change.type === 'remove' && change.id === node.id)
				)
				.map((node) => {
					const posChange = changes.find(
						(change) => change.type === 'position' && change.id === node.id
					);
					if (posChange) return { ...node, position: posChange.position };
					const dimChange = changes.find(
						(change) => change.type === 'dimensions' && change.id === node.id
					);
					if (dimChange) return { ...node, width: dimChange.width, height: dimChange.height };
					return node;
				})
		);
		setLastEvent({ type: 'onNodesChange', payload: changes });
	};

	const handleEdgesChange = (changes) => {
		setEdges((prev) =>
			prev.filter(
				(edge) => !changes.some((change) => change.type === 'remove' && change.id === edge.id)
			)
		);
		setLastEvent({ type: 'onEdgesChange', payload: changes });
	};

	const handleConnect = ({ source, target, sourceHandle, targetHandle }) => {
		const sourceNode = nodes.find((node) => node.id === source);
		const targetNode = nodes.find((node) => node.id === target);
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
		setLastEvent({ type: 'onConnect', payload: { source, target } });
	};

	const handleReconnect = (id, { source, target }) => {
		setEdges((prev) => prev.map((edge) => (edge.id === id ? { ...edge, source, target } : edge)));
		setLastEvent({ type: 'onReconnect', payload: { id, source, target } });
	};

	const handleDelete = () => {
		const selectedNodeIds = new Set(selection.nodes.map((node) => node.id));
		const selectedEdgeIds = new Set(selection.edges.map((edge) => edge.id));
		setNodes((prev) => prev.filter((node) => !selectedNodeIds.has(node.id)));
		setEdges((prev) => prev.filter((edge) => !selectedEdgeIds.has(edge.id)));
		setSelection({ nodes: [], edges: [] });
	};

	const addCd = () => {
		const seq = ++counterRef.current;
		setNodes((prev) => {
			const position = getDropPosition(prev);
			return [
				...prev,
				{
					id: `wh-new-${seq}`,
					type: 'cd',
					position,
					handleConfig: { color: PRIMARY },
					data: { label: `CD ${seq}`, priority: 1 }
				}
			];
		});
	};

	const addGrupoTiendas = () => {
		const seq = ++counterRef.current;
		setNodes((prev) => {
			const position = getDropPosition(prev);
			return [
				...prev,
				{
					id: `gt-new-${seq}`,
					type: 'grupoTiendas',
					position,
					handleConfig: { color: SECONDARY_DEEP },
					data: { label: `Grupo ${seq}`, tiendas: [] }
				}
			];
		});
	};

	return (
		<div style={{ width: '100%' }}>
			<div style={{ marginBottom: 8 }}>
				<button style={btnStyle} onClick={addCd}>
					agregar CD
				</button>
				<button style={btnStyle} onClick={addGrupoTiendas}>
					agregar grupo tienda
				</button>
				<button
					style={{
						...btnStyle,
						background: selection.nodes.length + selection.edges.length > 0 ? '#e53e3e' : '#ccc',
						cursor: selection.nodes.length + selection.edges.length > 0 ? 'pointer' : 'not-allowed'
					}}
					onClick={handleDelete}
					disabled={selection.nodes.length + selection.edges.length === 0}
				>
					eliminar
				</button>
			</div>
			<div style={{ height: 400 }}>
				<DiagramCanvas
					nodes={nodes}
					edges={edges}
					nodeComponents={nodeComponents}
					config={{ readOnly: false, resizableNodes: true }}
					onNodesChange={handleNodesChange}
					onEdgesChange={handleEdgesChange}
					onConnect={handleConnect}
					onReconnect={handleReconnect}
					onNodeClick={(id, data) => setLastEvent({ type: 'onNodeClick', payload: { id, data } })}
					onEdgeClick={(id, data) => setLastEvent({ type: 'onEdgeClick', payload: { id, data } })}
					onSelectionChange={setSelection}
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

// Borrado con confirmación — demuestra onBeforeDelete: RF consulta al consumidor antes
// de borrar. Retornar false cancela el borrado; el elemento nunca desaparece de la pantalla.
// Seleccioná un nodo o edge y presioná Backspace/Delete para ver el confirm.
export const DeleteWithConfirm = () => {
	const [nodes, setNodes] = useState(baseNodes);
	const [edges, setEdges] = useState(baseEdges);

	const handleBeforeDelete = async ({ nodes: nodesToDelete, edges: edgesToDelete }) => {
		const names = [
			...nodesToDelete.map((n) => `nodo "${n.id}"`),
			...edgesToDelete.map((e) => `conexión "${e.id}"`)
		].join(', ');
		const response = window.confirm(`¿Eliminar ${names}?`);
		return response;
	};

	const handleNodesChange = (changes) => {
		setNodes((prev) =>
			prev.filter((n) => !changes.some((c) => c.type === 'remove' && c.id === n.id))
		);
	};

	const handleEdgesChange = (changes) => {
		setEdges((prev) =>
			prev.filter((e) => !changes.some((c) => c.type === 'remove' && c.id === e.id))
		);
	};
	return (
		<div style={{ width: '100%', height: 400 }}>
			<DiagramCanvas
				nodes={nodes}
				edges={edges}
				nodeComponents={nodeComponents}
				config={{ readOnly: false }}
				onBeforeDelete={handleBeforeDelete}
				onNodesChange={handleNodesChange}
				onEdgesChange={handleEdgesChange}
			/>
		</div>
	);
};

// Botón externo — acción sobre el nodo seleccionado desde fuera del canvas.
// onSelectionChange entrega { nodes: [{id}], edges: [{id}] } con lo seleccionado.
export const ExternalAction = () => {
	const [nodes, setNodes] = useState(baseNodes);
	const [edges, setEdges] = useState(baseEdges);
	const [selectedNodes, setSelectedNodes] = useState([]);

	const handleSelectionChange = ({ nodes: n }) => setSelectedNodes(n.map((x) => x.id));

	const handleDelete = () => {
		setNodes((prev) => prev.filter((n) => !selectedNodes.includes(n.id)));
		setSelectedNodes([]);
	};

	return (
		<div style={{ width: '100%' }}>
			<div style={{ marginBottom: 8 }}>
				<button
					style={{ ...btnStyle, background: selectedNodes.length ? '#e53e3e' : '#ccc' }}
					disabled={!selectedNodes.length}
					onClick={handleDelete}
				>
					{selectedNodes.length ? `Eliminar "${selectedNodes.join(', ')}"` : 'Seleccioná un nodo'}
				</button>
			</div>
			<div style={{ height: 400 }}>
				<DiagramCanvas
					nodes={nodes}
					edges={edges}
					nodeComponents={nodeComponents}
					config={{ readOnly: false }}
					onSelectionChange={handleSelectionChange}
					onNodesChange={(changes) =>
						setNodes((prev) =>
							prev.filter((n) => !changes.some((c) => c.type === 'remove' && c.id === n.id))
						)
					}
					onEdgesChange={(changes) =>
						setEdges((prev) =>
							prev.filter((e) => !changes.some((c) => c.type === 'remove' && c.id === e.id))
						)
					}
				/>
			</div>
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
				<button style={btnStyle} onClick={() => canvasRef.current?.selectNodes(['wh-cordoba'])}>
					selectNode
				</button>
				<button style={btnStyle} onClick={() => canvasRef.current?.selectEdges(['e-1'])}>
					selectEdge
				</button>
				<button style={btnStyle} onClick={() => canvasRef.current?.clearSelection()}>
					clearSelection
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
