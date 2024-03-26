import styled from 'styled-components';
import viewsPalette from 'theme/palette';

export default {
	Initials: styled.div`
		width: ${({ size }) => size};
		height: ${({ size }) => size};
		border-radius: ${({ rounded }) => (rounded ? '50%' : '3px')};
		display: flex;
		justify-content: center;
		align-items: center;
		font-weight: 500;
		color: ${viewsPalette.white};
		background-color: ${({ color }) => color};
		text-transform: uppercase;
	`,
	Image: styled.img`
		width: ${({ size }) => size};
		height: ${({ size }) => size};
		display: ${({ show }) => (show ? 'flex' : 'none')};
		border-radius: ${({ rounded }) => (rounded ? '50%' : '3px')};
	`
};
