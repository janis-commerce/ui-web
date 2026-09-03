import React from 'react';
import PropTypes from 'prop-types';
import { useReactFlow, useStore, useStoreApi } from '@xyflow/react';
import Icon from '../Icon';
import styled from './styles';

// Selectores separados que devuelven primitivos (boolean/number): `@xyflow/react`
// no exporta `shallow`, así que evitamos necesitarlo y no generamos renders de más.
const isInteractiveSelector = (state) =>
	state.nodesDraggable || state.nodesConnectable || state.elementsSelectable;
const minZoomReachedSelector = (state) => state.transform[2] <= state.minZoom;
const maxZoomReachedSelector = (state) => state.transform[2] >= state.maxZoom;

const DiagramControls = ({ readOnly = false, additionalControls }) => {
	const store = useStoreApi();
	const { zoomIn, zoomOut, fitView } = useReactFlow();
	const isInteractive = useStore(isInteractiveSelector);
	const minZoomReached = useStore(minZoomReachedSelector);
	const maxZoomReached = useStore(maxZoomReachedSelector);

	const CONTROLS = {
		zoomIn: {
			icon: 'plus_big_light',
			label: 'Zoom in',
			isDisabled: maxZoomReached,
			handler: () => zoomIn()
		},
		zoomOut: {
			icon: 'minus_big_light',
			label: 'Zoom out',
			isDisabled: minZoomReached,
			handler: () => zoomOut()
		},
		fitView: {
			icon: 'expand',
			label: 'Fit view',
			handler: () => fitView()
		}
	};

	const toggleInteractivity = () => {
		store.setState({
			nodesDraggable: !isInteractive,
			nodesConnectable: !isInteractive,
			elementsSelectable: !isInteractive
		});
	};

	const controls = React.Children.toArray(additionalControls);

	const renderControlButton = ([key, action]) => (
		<styled.ButtonWrapper key={key} className="controls__button">
			<styled.Button
				onClick={action.handler}
				disabled={action.isDisabled}
				aria-label={action.label}
				title={action.label}
			>
				<Icon name={action.icon} />
			</styled.Button>
		</styled.ButtonWrapper>
	);

	return (
		<styled.Panel position="bottom-left" className="controls" aria-label="Diagram controls">
			{!!controls.length && <styled.Group className="controls__group">{controls}</styled.Group>}
			<styled.Group className="controls__group">
				{Object.entries(CONTROLS).map(renderControlButton)}
			</styled.Group>
			{!readOnly && (
				<styled.Group className="controls__group">
					{renderControlButton([
						'toggleInteractivity',
						{
							icon: isInteractive ? 'unlock' : 'lock',
							label: 'Toggle lock',
							handler: toggleInteractivity
						}
					])}
				</styled.Group>
			)}
		</styled.Panel>
	);
};

DiagramControls.displayName = 'DiagramControls';

DiagramControls.propTypes = {
	/** Cuando es `true`, oculta el botón de toggle de interactividad (lock/unlock): no tiene sentido des-bloquear un canvas que el consumidor declaró de solo lectura. */
	readOnly: PropTypes.bool,
	/** Nodo(s) React arbitrarios (un elemento suelto, un array, o arrays anidados: botones, switches, checkboxes, cualquier componente) renderizados en un grupo visualmente separado de los nativos. El estilo, la accesibilidad (aria-label, etc.) y el comportamiento de cada nodo son responsabilidad de quien lo define — `ui-web` no impone ninguna forma. */
	additionalControls: PropTypes.node
};

export default DiagramControls;
