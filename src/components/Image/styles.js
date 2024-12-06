import styled from 'styled-components';

const setSize = (value) => (value && !Number.isNaN(parseInt(value, 10)) ? `${value}px` : 'auto');

const getBorders = (value) => {
	if (value) return value === true ? '50%' : `${value}px`;
	return 'initial';
};

export default {
	ImageWrapper: styled.div`
		width: ${({ width }) => setSize(width)};
		height: ${({ height }) => setSize(height)};
		border-radius: ${({ roundBorders }) => getBorders(roundBorders)};
		${({ background }) => background && `background-color: ${background}`};
		overflow: hidden;
		display: flex;
		justify-content: center;
		align-items: center;
	`,
	Image: styled.img`
		width: ${({ width }) => setSize(width)};
		height: ${({ height }) => setSize(height)};
		border-radius: ${({ roundBorders }) => getBorders(roundBorders)};
	`
};
