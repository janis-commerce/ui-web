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

const DiagramCanvas = forwardRef(({ nodes, edges, nodeComponents, config, ...rest }, ref) => {
	const mergedConfig = useMemo(() => ({ ...defaultConfig, ...config }), [config]);
	return (
		<ReactFlowProvider>
			<Canvas
				ref={ref}
				nodes={nodes ?? []}
				edges={edges ?? []}
				nodeComponents={nodeComponents ?? {}}
				config={mergedConfig}
				{...rest}
			/>
		</ReactFlowProvider>
	);
});

DiagramCanvas.displayName = 'DiagramCanvas';
DiagramCanvas.propTypes = canvasPropTypes;

export default DiagramCanvas;
