import styled, { createGlobalStyle } from 'styled-components';
import { colors } from 'theme';

export default {
	InfoWindowStyles: createGlobalStyle`
		.gm-style-iw {
			&.gm-style-iw-c {
				/* stylelint-disable declaration-no-important */
				padding: 0 !important;
				top: ${props => props.top};
				border-radius: 0;
				border: none;
				border-bottom: 1px solid ${colors.blue};
			}

			&-tc,
			button.gm-ui-hover-effect {
				display: none !important;
			}
			
			&-d {
				overflow: unset !important;
			}
		}
	`,
	CardWrapper: styled.div`
		padding: 8px;
	`
};
