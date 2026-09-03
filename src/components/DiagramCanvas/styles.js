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
		}
	}

	&& svg {
		max-width: none;
		max-height: none;
		fill: ${getColor('black')};
	}

	/* La nativa .react-flow__controls-button:disabled svg (0,2,1) empata con && svg,
	   así que hace falta 0,3,1 para neutralizar su fill-opacity: 0.4 — que si no se
	   multiplica con el opacity del botón y deja el ícono al 16%. */
	&&:disabled svg {
		fill-opacity: 1;
	}
`;

export default {
	Container,
	Panel,
	Group,
	ButtonWrapper,
	Button
};
