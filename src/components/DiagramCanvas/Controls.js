import React from 'react';
import { Controls } from '@xyflow/react';
import styles from './styles';

const CONTROLS_STYLE = {
	background: '#ffffff',
	borderRadius: '8px',
	overflow: 'hidden',
	boxShadow: '0px 20px 25px -5px rgba(0,0,0,0.1), 0px 8px 10px -6px rgba(0,0,0,0.1)',
	'--xy-controls-box-shadow': 'none',
	'--xy-controls-button-background-color': '#ffffff',
	'--xy-controls-button-background-color-hover': '#f4f4f4',
	'--xy-controls-button-border-color': 'transparent',
	'--xy-controls-button-color': '#333333'
};

const DiagramControls = () => (
	<>
		<styles.ControlsGlobalStyle />
		<Controls style={CONTROLS_STYLE} />
	</>
);

DiagramControls.displayName = 'DiagramControls';

export default DiagramControls;
