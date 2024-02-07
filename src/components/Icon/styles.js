import styled from 'styled-components';
import colors from 'theme/palette';
import { findColorInPalette } from 'theme/utils';
import mixins from 'theme/mixins';
import { mediaBreaks } from 'utils/devices';

const styles = {
	Svg: styled.svg`
		fill: ${(props) => findColorInPalette(props.color)};

		${mediaBreaks.onlyPrint`
			fill: ${colors.darkGrey};
		`}

		${(props) => props.styles};
	`,
	Path: styled.path`
		fill: inherit;
		${(props) => props.styles};
	`
};

export default styles;

export const docz = {
	Grid: styled.div`
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(140px, 1fr));
		grid-gap: 15px;
	`,
	Item: styled.div`
		padding: 5px;
		border: 1px dashed #ccc;
		cursor: default;
		display: grid;
		justify-items: center;
		justify-content: center;
		grid-row-gap: 5px;
		${mixins.transition('color')};

		& ${styles.Svg} {
			${mixins.transition('fill')};
		}

		&:hover {
			color: ${colors.blue};
		}
		&:hover ${styles.Svg} {
			fill: ${colors.blue};
		}
	`,
	SearchInput: styled.input`
		margin-bottom: 10px;
		padding: 5px;
	`
};
