import styled, { css } from 'styled-components';
import Button from 'components/Button';

const setPosition = (position, open) => {
	switch (position) {
		case 'top':
			return css`
				width: 100%;
				height: unset;
				left: 0;
				right: 0;
				top: 0;
				transform: ${open ? 'translateY(0)' : 'translateY(-100%)'};
			`;
		case 'bottom':
			return css`
				width: 100%;
				height: unset;
				left: 0;
				right: 0;
				bottom: 0;
				transform: ${open ? 'translateY(0)' : 'translateY(100%)'};
			`;
		case 'left':
			return css`
				top: 0;
				left: 0;
				transform: ${open ? 'translateX(0)' : 'translateX(-100%)'};
			`;
		default:
			return css`
				top: 0;
				right: 0;
				transform: ${open ? 'translateX(0)' : 'translateX(100%)'};
			`;
	}
};

const Drawer = styled.div`
	position: absolute;
	height: 100%;
	display: flex;
	justify-content: center;
`;

const Checkbox = styled.input`
	display: none;

	&:checked {
		& ~ .drawer__overlay {
			display: block;
			opacity: 1;
		}

		& ~ .drawer__content {
			visibility: visible;
		}
	}
`;

const Overlay = styled.label`
	display: none;
	width: 100%;
	height: 100%;
	position: absolute;
	left: 0;
	top: 0;
`;

const Content = styled.div`
	position: absolute;
	visibility: hidden;
	background-color: #ffffff;
	box-sizing: border-box;
	min-width: 200px;
	height: 100%;
	${({ position, open }) => setPosition(position, open)};
	${({ transitionDuration }) =>
		transitionDuration &&
		`transition: all ${transitionDuration / 1000}s cubic-bezier(0.82, 0.085, 0.395, 0.895)`};
	padding: 16px 28px 32px 32px;
	border-radius: 3px;
	box-shadow: 0px 2px 5px 0px #27394727;
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

export default {
	Drawer,
	Checkbox,
	Overlay,
	Content,
	Header,
	CloseBtn,
	Children
};
