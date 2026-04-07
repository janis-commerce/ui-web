import styled from 'styled-components';
import Icon from 'components/Icon';
import palette from 'theme/palette';
import typography from 'theme/typography';

export default {
	Wrapper: styled.div`
		display: flex;
		align-items: center;
		align-self: center;
		height: 100%;
		max-height: 36px;
		overflow: hidden;
		white-space: nowrap;
	`,
	Icon: styled(Icon)`
		margin-right: 6px;
		flex-shrink: 0;
	`,
	Message: styled.span`
		color: ${palette.statusRed};
		font-size: ${typography.size.baseSmall};
		font-family: ${typography.fontFamily};
	`
};
