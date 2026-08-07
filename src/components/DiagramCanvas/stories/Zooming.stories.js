/* eslint-disable react/prop-types */
import React from 'react';
import DiagramCanvas from '../DiagramCanvas';
import { nodeComponents } from './components';
import { baseNodes, baseEdges } from './mock';
import meta from './meta';

export default { ...meta, title: 'Components/DiagramCanvas/Zooming' };

// initialZoom centra el diagrama sobre sus nodos y fija ese zoom exacto al montar,
// en vez del zoom auto-calculado por fitViewOnMount. fitView se desactiva
// automáticamente cuando initialZoom está definido.
export const InitialZoom = () => (
	<div style={{ width: '100%', height: 500 }}>
		<DiagramCanvas
			nodes={baseNodes}
			edges={baseEdges}
			nodeComponents={nodeComponents}
			config={{ initialZoom: 1.5 }}
		/>
	</div>
);

// initialZoom se clampea contra minZoom/maxZoom efectivos. Acá se amplían esos
// límites (default de React Flow: 0.5/2) para que initialZoom=5 no se recorte
// y se aplique tal cual — demuestra el caso "dentro de límites ampliados".
export const ExpandedZoomRange = () => (
	<div style={{ width: '100%', height: 500 }}>
		<DiagramCanvas
			nodes={baseNodes}
			edges={baseEdges}
			nodeComponents={nodeComponents}
			config={{ minZoom: 1, maxZoom: 10, initialZoom: 5 }}
		/>
	</div>
);

// initialZoom por encima del maxZoom efectivo (default de RF: 2, sin declarar
// minZoom/maxZoom acá). El diagrama debe montar en zoom 2, no en 5 — es el caso
// que motivó el clamp: sin él, setCenter aplicaría 5 tal cual y el primer scroll
// del usuario lo haría "saltar" de golpe a 2.
export const ClampedInitialZoom = () => (
	<div style={{ width: '100%', height: 500 }}>
		<DiagramCanvas
			nodes={baseNodes}
			edges={baseEdges}
			nodeComponents={nodeComponents}
			config={{ initialZoom: 5 }}
		/>
	</div>
);

// minZoom/maxZoom inválidos: ninguno de los dos casos debe romper el diagrama,
// ambos caen a los defaults de React Flow (0.5/2) y loguean un warning —
// abrir la consola del browser para verlo.
export const NegativeZoomBound = () => (
	<div style={{ width: '100%', height: 500 }}>
		<DiagramCanvas
			nodes={baseNodes}
			edges={baseEdges}
			nodeComponents={nodeComponents}
			config={{ minZoom: -1 }}
		/>
	</div>
);

export const InvertedZoomRange = () => (
	<div style={{ width: '100%', height: 500 }}>
		<DiagramCanvas
			nodes={baseNodes}
			edges={baseEdges}
			nodeComponents={nodeComponents}
			config={{ minZoom: 5, maxZoom: 2, initialZoom: 3 }}
		/>
	</div>
);

// Diagrama sin nodos + initialZoom: no debe lanzar ningún error (el guard de
// bounds vacío corta el efecto antes de llamar setCenter).
export const EmptyDiagram = () => (
	<div style={{ width: '100%', height: 500 }}>
		<DiagramCanvas
			nodes={[]}
			edges={[]}
			nodeComponents={nodeComponents}
			config={{ initialZoom: 1.5 }}
		/>
	</div>
);

// fitViewOnMount + initialZoom a la vez: gana initialZoom, fitView nunca corre.
// No debería verse un "flash" del encuadre automático antes de saltar al zoom fijo.
export const FitViewAndInitialZoomTogether = () => (
	<div style={{ width: '100%', height: 500 }}>
		<DiagramCanvas
			nodes={baseNodes}
			edges={baseEdges}
			nodeComponents={nodeComponents}
			config={{ fitViewOnMount: true, initialZoom: 1.5 }}
		/>
	</div>
);
