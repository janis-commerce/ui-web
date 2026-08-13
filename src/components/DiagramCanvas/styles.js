import styled from 'styled-components';
import { Panel as XyPanel, ControlButton } from '@xyflow/react';
import { getColor } from 'theme/utils';

const Container = styled.div`
	width: 100%;
	height: 100%;
`;

// `&&` (doble clase → especificidad 0,2,0) gana contra las clases nativas de
// React Flow (`.react-flow__panel` 0,1,0 / `.react-flow__controls-button` 0,1,0)
// sin depender del orden de inyección entre styled-components y
// `@xyflow/react/dist/style.css` (ver design.md).
const Panel = styled(XyPanel)`
	&& {
		display: flex;
		flex-direction: column;
		background: #ffffff;
		border: 1px solid ${getColor('greyHover')};
		border-radius: 8px;
		padding: 8px 0;
		overflow: hidden;
		box-shadow: 0px 8px 10px -6px #0000001a;
	}
`;

const Group = styled.div`
	display: flex;
	flex-direction: column;
	gap: 8px;

	/* Separador entre grupos: solo aparece cuando hay dos Group hermanos
	   (additionalControls + nativos), nunca cuando hay uno solo. */
	& + & {
		margin-top: 8px;
		padding-top: 8px;
		border-top: 1px solid ${getColor('greyHover')};
	}
`;

const ButtonWrapper = styled.div`
	padding: 0 8px;
`;

const Button = styled(ControlButton)`
	&& {
		width: 100%;
		height: 100%;
		border: none;
		border-radius: 4px;
		background: transparent;

		&:hover {
			background: ${getColor('greyHoverLight')};
		}

		&:disabled {
			opacity: 0.4;
			cursor: not-allowed;
		}
	}

	&& svg {
		max-width: none;
		max-height: none;
		fill: ${getColor('black')};
	}
`;

export default {
	Container,
	Panel,
	Group,
	ButtonWrapper,
	Button
};
