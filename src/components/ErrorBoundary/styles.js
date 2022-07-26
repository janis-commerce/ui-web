import styled from 'styled-components';
import Icon from 'components/Icon';

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
	`
};
