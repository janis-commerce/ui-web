import styled from 'styled-components';
import mixins from 'theme/mixins';
import viewsPalette from 'theme/palette';

export default {
	Initials: styled.div`
		width: ${({ size }) => size};
		height: ${({ size }) => size};
		border-radius: ${({ rounded }) => (rounded ? '50%' : '3px')};
		font-weight: 500;
		color: ${viewsPalette.white};
		background-color: ${({ color }) => color};
		text-transform: uppercase;
		${mixins.flexCenter};
	`
};
