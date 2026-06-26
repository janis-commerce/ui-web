/* eslint-disable react/prop-types */
import React, { useRef } from 'react';
import DiagramCanvas from '../DiagramCanvas';
import { nodeComponents } from './components';
import { baseNodes, baseEdges } from './mock';
import { btnStyle } from './storyStyles';
import meta from './meta';

export default { ...meta, title: 'Components/DiagramCanvas/Ref API' };

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
			<div style={{ width: '100%', height: 500 }}>
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
