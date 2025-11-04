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
	border-top: 1px solid transparent;
	padding: 16px;
	${({ contentBorder }) => contentBorder && `border-top-color: ${palette.blue}`};
`;

export default {
	Wrapper,
	HeaderWrapper,
	CollapseButton,
	ContentWrapper
};
