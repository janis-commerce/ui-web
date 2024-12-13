import Chip from 'components/Chip';
import styled from 'styled-components';
import colors from 'theme/palette';

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
		width: calc(100% - 20px);
		box-shadow: rgba(0, 0, 0, 0.3) 0px 1px 4px -1px;
	`,
	Test: styled.div`
		height: 200px;
		width: 100px;
		background: #FF0000;
		> span {
			color: green;
			font-size: 20px;
		}
	`,
	TestInfoWindow: styled(Chip)`
		height: 50px;
		width: 100px;
		background: #8822ff;
		> span {
			color: white;
			font-size: 15px;
		}
	`
};
