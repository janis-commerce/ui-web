/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import DiagramCanvas from '../DiagramCanvas';
import { nodeComponents } from './components';
import { baseNodes, baseEdges, edgeCdCd, edgeCdGrupo, PRIMARY, SECONDARY_DEEP } from './mock';
import { eventCardStyle, eventLabelStyle, btnStyle } from './storyStyles';
import meta from './meta';

export default { ...meta, title: 'Components/DiagramCanvas/Interactions' };

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
			<div style={{ height: 500 }}>
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
		<div style={{ width: '100%', height: 500 }}>
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
			<div style={{ height: 500 }}>
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
