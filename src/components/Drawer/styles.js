import styled, { css } from 'styled-components';
import Button from 'components/Button';

const setPosition = (position, open) => {
	switch (position) {
		case 'top':
			return css`
				width: 100%;
				height: auto;
				left: 0;
				right: 0;
				top: 0;
				transform: ${open ? 'scaleY(1)' : 'scaleY(0)'};
				transform-origin: top;
			`;
		case 'bottom':
			return css`
				width: 100%;
				height: auto;
				left: 0;
				right: 0;
				bottom: 0;
				transform: ${open ? 'scaleY(1)' : 'scaleY(0)'};
				transform-origin: bottom;
			`;
		case 'left':
			return css`
				top: 0;
				left: 0;
				transform: ${open ? 'scaleX(1)' : 'scaleX(0)'};
				transform-origin: left;
			`;
		default:
			return css`
				top: 0;
				right: 0;
				transform: ${open ? 'scaleX(1)' : 'scaleX(0)'};
				transform-origin: right;
			`;
	}
};

const Drawer = styled.div`
	min-width: 200px;
	height: 100%;
	box-sizing: border-box;
	background-color: #ffffff;
	overflow: auto;
	position: absolute;
	box-shadow: 0px 2px 5px 0px #27394727;
	border-radius: 3px;
	padding: 16px 28px 32px 32px;
	${({ position, open }) => setPosition(position, open)};
	${({ transitionDuration }) =>
		transitionDuration &&
		`transition: transform ${transitionDuration / 1000}s cubic-bezier(0.82, 0.085, 0.395, 0.895)`};
`;

const Header = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;
	width: 100%;
`;

const CloseBtn = styled(Button)`
	width: 24px;
	height: 24px;
	padding: 0;
	background-color: transparent;
	border-radius: 0;
	outline: 0;
	margin-left: auto;
`;

const Children = styled.div``;

const Overlay = styled.div`
	position: absolute;
	width: 100%;
	height: 100%;
	top: 0;
	left: 0;
	visibility: ${({ open }) => (open ? 'visible' : 'hidden')};
	pointer-events: ${({ open }) => (open ? 'auto' : 'none')};
`;

export default {
	Drawer,
	Header,
	CloseBtn,
	Children,
	Overlay
};
