import Button from 'components/Button';
import styled from 'styled-components';
import palette from 'theme/palette';

const Wrapper = styled.div`
	border-radius: 3px;
	background-color: ${palette.white};
`;

const HeaderWrapper = styled.div`
	display: flex;
	gap: 16px;
	${({ position }) => position === 'right' && 'flex-direction: row-reverse'};
	align-items: center;
	padding: 8px 16px;
`;

const CollapseButton = styled(Button)`
	padding: 0;

	&:hover,
	&:focus,
	&:active {
		background-color: transparent;
	}
`;

const ContentWrapper = styled.section`
	padding: 16px;
	border-top: ${({ contentBorder }) => `1px solid ${contentBorder ? palette.blue : 'transparent'}`};
`;

export default {
	Wrapper,
	HeaderWrapper,
	CollapseButton,
	ContentWrapper
};
