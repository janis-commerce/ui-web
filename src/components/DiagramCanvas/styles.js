import styled, { createGlobalStyle } from 'styled-components';

const ControlsGlobalStyle = createGlobalStyle`
	.react-flow__controls-button:last-child {
		border-top: 1px solid #eeeeee !important;
	}
`;

export default {
	Container: styled.div`
		width: 100%;
		height: 100%;
	`,
	ControlsGlobalStyle
};
