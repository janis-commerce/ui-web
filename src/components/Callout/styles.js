import styled from 'styled-components';
import palette from 'theme/palette';

export default {
	Callout: styled.div`
		display: flex;
		align-items: center;
		gap: 4px;
		padding: 4px 24px;
		background-color: ${(props) => props.$background};
		color: ${palette.black};

		.callout__icon {
			flex-shrink: 0;
		}
	`,
	Content: styled.div`
		flex: 1;
		min-width: 0;
		overflow-wrap: anywhere;
	`,
	CloseButton: styled.button`
		display: flex;
		flex-shrink: 0;
		padding: 0;
		border: none;
		background: none;
		cursor: pointer;
	`
};
