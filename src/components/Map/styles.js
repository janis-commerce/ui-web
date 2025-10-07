import styled, { createGlobalStyle } from 'styled-components';
import colors from 'theme/palette';

export const InfoWindowStyles = createGlobalStyle`
		.gm-style-iw {
			&.gm-style-iw-c {
				padding: 0 !important;
				border-radius: 0;
				border: none;
				max-height: unset !important;
			}

			&-chr {
				display: none;
			}

			&-tc,
			button.gm-ui-hover-effect {
				display: none !important;
			}
			
			&-d {
				overflow: unset !important;
				max-height: unset !important;
			}
		}
	`;

export default {
	LoadingElement: styled.div`
		height: 100%;
	`,
	SearchBoxWrapper: styled.div`
		z-index: 0;
		position: relative;
		right: 0px;
		top: 0px;
		background: ${colors.white};
		margin: 10px;
		padding: 4px 8px 6px;
		border-radius: 2px;
		width: auto;
		box-shadow: rgba(0, 0, 0, 0.3) 0px 1px 4px -1px;
	`
};
