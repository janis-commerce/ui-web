import styled, { css, keyframes } from 'styled-components';

const show = keyframes`
  0% {
      opacity: 0;
  } to {
      opacity: 1;
  }
`;

const Container = styled.section`
	display: flex;
	justify-content: center;
	align-items: center;
	width: 100vw;
	height: 100vh;
	position: fixed;
	top: 0;
	left: 0;
	background: ${({ backgroundColor }) => backgroundColor};
	${({ effect }) => effect && css(effect)};
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

export default {
	Container,
	LoaderContainer
};
