import styled, { css } from 'styled-components';
import Button from 'components/Button';

const getPropertyForTransition = (position) =>
	position === 'right' || position === 'left' ? 'max-width' : 'max-height';

const verticalCommonStyles = (open) => css`
	width: 100%;
	${({ fullScreen }) => fullScreen && 'height: 100%'};
	max-height: ${open ? '100%' : 0};
	left: 0;
	right: 0;
`;

const horizontalCommonStyles = (open) => css`
	height: 100%;
	${({ fullScreen }) => fullScreen && 'width: 100%'};
	max-width: ${open ? '100%' : 0};
	top: 0;
`;

const setPosition = (position, open) => {
	const positions = {
		top: () => css`
			${verticalCommonStyles(open)};
			top: 0;
		`,
		bottom: () => css`
			${verticalCommonStyles(open)};
			bottom: 0;
		`,
		left: () => css`
			${horizontalCommonStyles(open)};
			left: 0;
		`,
		right: () => css`
			${horizontalCommonStyles(open)};
			right: 0;
		`
	};

	return positions[position];
};

const Drawer = styled.div`
	box-sizing: border-box;
	background-color: #ffffff;
	overflow: hidden;
	position: absolute;
	box-shadow: 0px 2px 5px 0px #27394727;
	border-radius: 3px;
	${({ position, open, transitionDuration }) => {
		const transitionTime = transitionDuration / 1000;
		return css`
			${position && setPosition(position, open)};
			${transitionDuration &&
			`transition: ${getPropertyForTransition(position)} ${transitionTime}s ease`};
		`;
	}};
	z-index: 999;
`;

const Content = styled.div`
	min-height: 300px;
	min-width: 300px;
	box-sizing: border-box;
	padding: 16px 28px 32px 32px;
`;

const Header = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;
	width: 100%;
	box-sizing: border-box;
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

const Children = styled.div`
	width: inherit;
`;

const Overlay = styled.div`
	position: absolute;
	width: 100%;
	height: 100%;
	top: 0;
	left: 0;
	visibility: hidden;
	pointer-events: none;
	z-index: 998;
`;

export default {
	Drawer,
	Content,
	Header,
	CloseBtn,
	Children,
	Overlay
};
