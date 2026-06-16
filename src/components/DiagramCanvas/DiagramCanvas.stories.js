import React, { useState, useRef } from 'react';
import DiagramCanvas from './DiagramCanvas';

const PRIMARY = '#2979ff';
const PRIMARY_SOFT = '#e8f0ff';
const SECONDARY_DEEP = '#b86a2b';
const SECONDARY_SOFT = '#ffeddd';

const WarehouseIcon = () => (
	<svg
		viewBox="0 0 24 24"
		width={18}
		height={18}
		fill="none"
		stroke="currentColor"
		strokeWidth="1.8"
		strokeLinecap="round"
		strokeLinejoin="round"
	>
		<path d="M22 8.35V20a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V8.35a1 1 0 0 1 .726-.961l9-2.572a1 1 0 0 1 .548 0l9 2.572a1 1 0 0 1 .726.961Z" />
		<path d="M6 18v-7M18 18v-7M10 21v-7h4v7" />
	</svg>
);

const StoreIcon = () => (
	<svg
		viewBox="0 0 24 24"
		width={18}
		height={18}
		fill="none"
		stroke="currentColor"
		strokeWidth="1.8"
		strokeLinecap="round"
		strokeLinejoin="round"
	>
		<path d="M3 9 4.5 4.5h15L21 9" />
		<path d="M3 9v11a1 1 0 0 0 1 1h16a1 1 0 0 0 1-1V9" />
		<path d="M3 9c0 1.5 1.5 3 3 3s3-1.5 3-3M9 9c0 1.5 1.5 3 3 3s3-1.5 3-3M15 9c0 1.5 1.5 3 3 3s3-1.5 3-3" />
	</svg>
);

const CdNode = ({ data, selected }) => (
	<div
		style={{
			background: selected ? PRIMARY_SOFT : '#fff',
			border: `2px solid ${selected ? PRIMARY : '#c8d8f0'}`,
			borderRadius: 10,
			padding: '12px 12px 6px 8px',
			boxShadow: selected ? `0 4px 14px ${PRIMARY}3d` : '0 2px 6px rgba(0,17,51,0.06)',
			display: 'flex',
			alignItems: 'center',
			gap: 8,
			cursor: 'pointer',
			minWidth: 110
		}}
	>
		<div
			style={{
				color: PRIMARY,
				background: PRIMARY_SOFT,
				borderRadius: 7,
				width: 30,
				height: 30,
				flexShrink: 0,
				display: 'flex',
				alignItems: 'center',
				justifyContent: 'center',
				position: 'relative'
			}}
		>
			<WarehouseIcon />
			{data.priority != null && (
				<span
					style={{
						position: 'absolute',
						top: 0,
						right: 0,
						transform: 'translate(50%, -50%)',
						width: 16,
						height: 16,
						borderRadius: '50%',
						background: PRIMARY,
						color: '#fff',
						fontSize: 9,
						fontWeight: 700,
						display: 'flex',
						alignItems: 'center',
						justifyContent: 'center',
						border: '2px solid #fff'
					}}
				>
					{data.priority}
				</span>
			)}
		</div>
		<div style={{ fontWeight: 400, fontSize: 13, color: '#001233', whiteSpace: 'nowrap' }}>
			{data.label}
		</div>
	</div>
);

const GrupoTiendasNode = ({ data, selected }) => {
	const count = (data.tiendas || []).length;
	return (
		<div
			style={{
				background: selected ? SECONDARY_SOFT : '#fff',
				border: `2px solid ${selected ? SECONDARY_DEEP : '#e8cdb0'}`,
				borderRadius: 10,
				padding: '12px 12px 6px 8px',
				boxShadow: selected ? `0 4px 14px ${SECONDARY_DEEP}3d` : '0 2px 6px rgba(0,17,51,0.06)',
				display: 'flex',
				alignItems: 'center',
				gap: 8,
				cursor: 'pointer',
				minWidth: 110
			}}
		>
			<div
				style={{
					color: SECONDARY_DEEP,
					background: SECONDARY_SOFT,
					borderRadius: 7,
					width: 30,
					height: 30,
					flexShrink: 0,
					display: 'flex',
					alignItems: 'center',
					justifyContent: 'center',
					position: 'relative'
				}}
			>
				<StoreIcon />
				<span
					style={{
						position: 'absolute',
						top: 0,
						right: 0,
						transform: 'translate(50%, -50%)',
						width: 16,
						height: 16,
						borderRadius: '50%',
						background: count ? SECONDARY_DEEP : '#7588a3',
						color: '#fff',
						fontSize: 9,
						fontWeight: 700,
						display: 'flex',
						alignItems: 'center',
						justifyContent: 'center',
						border: '2px solid #fff'
					}}
				>
					{count}
				</span>
			</div>
			<div style={{ fontWeight: 400, fontSize: 13, color: '#001233', whiteSpace: 'nowrap' }}>
				{data.label}
			</div>
		</div>
	);
};

const nodeComponents = { cd: CdNode, grupoTiendas: GrupoTiendasNode };

const baseNodes = [
	{
		id: 'wh-cordoba',
		type: 'cd',
		position: { x: 340, y: 170 },
		handleConfig: { color: PRIMARY },
		data: { label: 'Córdoba', priority: 1 }
	},
	{
		id: 'wh-escobar',
		type: 'cd',
		position: { x: 540, y: 230 },
		handleConfig: { color: PRIMARY },
		data: { label: 'Escobar', priority: 1 }
	},
	{
		id: 'wh-mendoza',
		type: 'cd',
		position: { x: 120, y: 200 },
		handleConfig: { color: PRIMARY },
		data: { label: 'Mendoza', priority: 2 }
	},
	{
		id: 'gt-cba',
		type: 'grupoTiendas',
		position: { x: 540, y: 60 },
		handleConfig: { color: SECONDARY_DEEP },
		data: { label: 'Zona Córdoba L-M', tiendas: ['st-cba-1', 'st-cba-2'] }
	},
	{
		id: 'gt-norte',
		type: 'grupoTiendas',
		position: { x: 760, y: 170 },
		handleConfig: { color: SECONDARY_DEEP },
		data: { label: 'BsAs Norte M-V', tiendas: ['st-esc-1', 'st-esc-2'] }
	}
];

const edgeCdCd = {
	lineType: 'step',
	animated: true,
	style: { stroke: PRIMARY, strokeWidth: 2, strokeDasharray: '6 3' },
	selectedStyle: { stroke: PRIMARY, strokeWidth: 3, strokeDasharray: 'none' },
	arrowEnd: { type: 'outlined', color: PRIMARY }
};
const edgeCdGrupo = {
	lineType: 'step',
	animated: true,
	style: { stroke: SECONDARY_DEEP, strokeWidth: 2, strokeDasharray: '6 3' },
	selectedStyle: { stroke: SECONDARY_DEEP, strokeWidth: 3, strokeDasharray: 'none' },
	arrowStart: { type: 'outlined', color: SECONDARY_DEEP },
	arrowEnd: { type: 'outlined', color: SECONDARY_DEEP }
};

const baseEdges = [
	{
		id: 'e-1',
		source: 'wh-mendoza',
		target: 'wh-cordoba',
		...edgeCdCd,
		label: 'Ruta principal',
		data: { priority: 1 }
	},
	{
		id: 'e-2',
		source: 'wh-cordoba',
		target: 'wh-escobar',
		...edgeCdCd,
		label: 'Ruta secundaria',
		data: { priority: 2 }
	},
	{
		id: 'e-3',
		source: 'wh-cordoba',
		target: 'gt-cba',
		...edgeCdGrupo,
		label: 'CD → Grupo Cba',
		data: { type: 'abastecimiento' }
	},
	{
		id: 'e-4',
		source: 'wh-escobar',
		target: 'gt-norte',
		...edgeCdGrupo,
		label: 'CD → Grupo Norte',
		data: { type: 'abastecimiento' }
	}
];

export default {
	title: 'Components/DiagramCanvas',
	component: DiagramCanvas,
	parameters: { layout: 'padded' },
	argTypes: {
		adapter: { table: { disable: true } },
		nodes: {
			control: false,
			description: `Array de nodos del diagrama.

\`\`\`js
[{
  id: 'node-1',
  type: 'cd',
  position: { x: 0, y: 0 },
  handleConfig: {
    color: '#2979ff',
    positions: ['top', 'right', 'bottom', 'left'] // opcional, default 4 lados; [] oculta los handles
  },
  data: { label: 'Córdoba', priority: 1 }
}]
\`\`\``
		},
		edges: {
			control: false,
			description: `Array de edges del diagrama.

\`\`\`js
[{
  id: 'e-1',
  source: 'node-1',
  target: 'node-2',
  lineType: 'step',   // 'step' | 'curved' | 'straight'
  animated: true,
  style: { stroke: '#2979ff', strokeWidth: 2 },
  selectedStyle: { stroke: '#2979ff', strokeWidth: 3 }, // estilo al seleccionar
  arrowEnd: { type: 'outlined', color: '#2979ff' }  // 'outlined' | 'contained'
}]
\`\`\``
		},
		nodeComponents: { control: false },
		config: {
			description: `Configuración del canvas.

\`\`\`js
{
  readOnly: false,      // deshabilita drag y conexiones (default: true)
  showControls: true,   // muestra botones de zoom (default: true)
  showMiniMap: true     // muestra el minimapa (default: true)
}
\`\`\``
		},
		onConnect: {
			description: `El usuario conectó dos nodos. Debe retornar el edge completo a agregar.

\`\`\`js
onConnect={({ source, target }) => ({
  id: \`e-\${source}-\${target}\`,
  source,
  target,
  lineType: 'step',
  arrowEnd: { type: 'outlined', color: '#2979ff' }
})}
\`\`\``
		},
		onNodesChange: {
			description: `Cambios en nodos producidos por el usuario.

\`\`\`js
onNodesChange={(changes) => {
  // change: { type: 'position', id, position } | { type: 'remove', id }
  setNodes(prev => prev
    .filter(n => !changes.some(c => c.type === 'remove' && c.id === n.id))
    .map(n => {
      const c = changes.find(c => c.type === 'position' && c.id === n.id);
      return c ? { ...n, position: c.position } : n;
    })
  );
}}
\`\`\``
		},
		onEdgesChange: {
			description: `Cambios en edges producidos por el usuario.

\`\`\`js
onEdgesChange={(changes) => {
  // change: { type: 'remove', id }
  setEdges(prev => prev.filter(e => !changes.some(c => c.type === 'remove' && c.id === e.id)));
}}
\`\`\``
		},
		onNodeClick: {
			description: `El usuario hizo click en un nodo.

\`\`\`js
onNodeClick={(id, data) => console.log(id, data)}
\`\`\``
		},
		onEdgeClick: {
			description: `El usuario hizo click en un edge.

\`\`\`js
onEdgeClick={(id, data) => console.log(id, data)}
\`\`\``
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
