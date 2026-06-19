import React, { forwardRef, useMemo } from 'react';
import { ReactFlowProvider } from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import Canvas, { canvasPropTypes } from './Canvas';

const defaultConfig = {
	readOnly: true,
	showControls: true,
	showMiniMap: true,
	resizableNodes: false
};

const DiagramCanvas = forwardRef((props, ref) => {
	const mergedConfig = useMemo(() => ({ ...defaultConfig, ...props.config }), [props.config]);
	return (
		<ReactFlowProvider>
			<Canvas
				ref={ref}
				nodes={props.nodes ?? []}
				edges={props.edges ?? []}
				nodeComponents={props.nodeComponents ?? {}}
				config={mergedConfig}
				onNodesChange={props.onNodesChange}
				onEdgesChange={props.onEdgesChange}
				onConnect={props.onConnect}
				onReconnect={props.onReconnect}
				onNodeClick={props.onNodeClick}
				onEdgeClick={props.onEdgeClick}
				onBeforeDelete={props.onBeforeDelete}
				onSelectionChange={props.onSelectionChange}
			/>
		</ReactFlowProvider>
	);
});

DiagramCanvas.displayName = 'DiagramCanvas';
DiagramCanvas.propTypes = canvasPropTypes;

export default DiagramCanvas;
