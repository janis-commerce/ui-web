import styled, { css, keyframes } from 'styled-components';
import { getColor } from 'theme/utils';

const show = keyframes`
  0% {
      opacity: 0;
  } to {
      opacity: 1;
  }
`;

const rotate = keyframes`
	to {
		transform: rotate(360deg);
	}
`;

export const EFFECTS = {
	none: {
		background: 'transparent',
		backdropFilter: 'none'
	},
	blur: {
		background:
			'linear-gradient(180deg, rgba(224, 238, 245, 0.5) 0%, rgba(221, 221, 221, 0.5) 100%)',
		backdropFilter: 'blur(7.5px)'
	},
	dark: {
		background: 'rgba(0, 0, 0, 0.7)',
		backdropFilter: 'none'
	},
	darkBlur: {
		background: 'rgba(0, 0, 0, 0.4)',
		backdropFilter: 'blur(10px)'
	},
	opaque: {
		background: 'rgba(255, 255, 255, 0.9)',
		backdropFilter: 'none'
	},
	glass: {
		background: 'rgba(255, 255, 255, 0.15)',
		backdropFilter: 'blur(10px)'
	}
};

const Container = styled.section`
	display: flex;
	justify-content: center;
	align-items: center;
	width: 100vw;
	height: 100vh;
	position: fixed;
	top: 0;
	left: 0;
	background: ${({ effect }) => EFFECTS[effect]?.background || EFFECTS.blur.background};
	backdrop-filter: ${({ effect }) =>
		EFFECTS[effect]?.backdropFilter || EFFECTS.blur.backdropFilter};

	z-index: 100;
	animation: ${show} 0.2s ease-in;
`;

const LoaderContainer = styled.div`
	position: relative;
	display: flex;
	justify-content: center;
	align-items: center;
	width: 115px;
	height: 115px;
`;

const Loader = styled.div`
	width: 115px;
	height: 115px;
	border-radius: 50%;
	background-color: transparent;
	${({ color }) => css`
		border-top: 8px solid ${getColor(color)};
		border-right: 8px solid ${getColor(color)};
		border-bottom: 8px solid ${getColor(color)};
	`}
	border-left: 8px solid ${getColor('grey')};
	animation: ${rotate} 4s linear infinite;
	position: absolute;
`;

export default {
	Container,
	LoaderContainer,
	Loader
};
