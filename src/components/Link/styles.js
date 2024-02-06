import styled from 'styled-components';
import Icon from 'components/Icon';
import { findColorInPalette } from 'theme/utils';

export default {
	LinkWrapper: styled.div`
		display: flex;
		color: ${findColorInPalette('blue')};
		align-items: center;
		font-size: 13px;
		& a {
			text-decoration: none;
			color: inherit;
		}
	`,
	StyledIcon: styled(Icon)`
		margin-right: 8px;
	`
};
