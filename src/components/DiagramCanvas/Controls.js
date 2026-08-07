import React, { useCallback } from 'react';
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

const DiagramControls = ({ additionalControls = [] }) => {
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

	const toggleInteractivity = useCallback(() => {
		store.setState({
			nodesDraggable: !isInteractive,
			nodesConnectable: !isInteractive,
			elementsSelectable: !isInteractive
		});
	}, [isInteractive, store]);

	return (
		<styled.Panel position="bottom-left" className="controls">
			{!!additionalControls.length && (
				<styled.Group className="controls__group">
					{additionalControls.map((control, index) => (
						// eslint-disable-next-line react/no-array-index-key
						<React.Fragment key={index}>{control}</React.Fragment>
					))}
				</styled.Group>
			)}
			<styled.Group className="controls__group">
				{Object.entries(CONTROLS).map(([key, action]) => (
					<styled.ButtonWrapper key={key} className="controls__button">
						<styled.Button
							onClick={action.handler}
							disabled={action.isDisabled}
							aria-label={action.label}
						>
							<Icon name={action.icon} color="black" />
						</styled.Button>
					</styled.ButtonWrapper>
				))}
			</styled.Group>
			<styled.Group className="controls__group">
				<styled.ButtonWrapper className="controls__button">
					<styled.Button onClick={toggleInteractivity} aria-label="Toggle lock">
						<Icon name={isInteractive ? 'unlock' : 'lock'} color="black" />
					</styled.Button>
				</styled.ButtonWrapper>
			</styled.Group>
		</styled.Panel>
	);
};

DiagramControls.displayName = 'DiagramControls';

DiagramControls.propTypes = {
	/** Nodos React arbitrarios (botones, switches, checkboxes, cualquier componente) renderizados en un grupo visualmente separado de los nativos. El estilo, la accesibilidad (aria-label, etc.) y el comportamiento de cada nodo son responsabilidad de quien lo define — `ui-web` no impone ninguna forma. */
	additionalControls: PropTypes.arrayOf(PropTypes.node)
};

export default DiagramControls;
