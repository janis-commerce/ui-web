import styled from 'styled-components';

export default {
	Image: styled.img`
		width: ${({ size }) => size};
		height: ${({ size }) => size};
		display: ${({ show }) => (show ? 'flex' : 'none')};
		border-radius: ${({ rounded }) => (rounded ? '50%' : '3px')};
	`
};
