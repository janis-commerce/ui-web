import { css } from 'styled-components';
import typography from 'theme/typography';
import colors from 'theme/palette';

const DEFAULT_TYPOGRAPHY = {
	heading: css`
		font-weight: 500;
		font-style: medium;
		letter-spacing: 0;
	`,
	title: css`
		font-weight: 700;
		font-style: bold;
		letter-spacing: 0;
	`,
	label: css`
		font-weight: 500;
		font-style: medium;
		letter-spacing: 0;
	`,
	body: css`
		font-weight: 400;
		font-style: regular;
		letter-spacing: 0;
	`,
	overline: css`
		font-weight: 500;
		font-style: medium;
		text-transform: uppercase;
	`
};

export const TYPOGRAPHY = {
	display: {
		large: css`
			font-size: 42px;
			font-weight: 400;
			font-style: regular;
			line-height: 50px;
			letter-spacing: 0;
		`
	},
	heading: {
		large: css`
			font-size: 34px;
			line-height: 40px;
		`,
		medium: css`
			font-size: 26px;
			line-height: 32px;
		`,
		small: css`
			font-size: 24px;
			line-height: 28px;
		`
	},
	title: {
		large: css`
			font-size: ${typography.size.xxlarge};
			line-height: 24px;
			font-weight: 400;
			font-style: regular;
			letter-spacing: 0;
		`,
		medium: css`
			font-size: ${typography.size.xlarge};
			line-height: 22px;
		`,
		small: css`
			font-size: ${typography.size.medium};
			line-height: 16px;
		`
	},
	label: {
		large: css`
			font-size: ${typography.size.large};
			line-height: 18px;
		`,
		medium: css`
			font-size: ${typography.size.medium};
			line-height: 16px;
		`,
		small: css`
			font-size: ${typography.size.baseSmall};
			line-height: 14px;
		`
	},
	body: {
		large: css`
			font-size: ${typography.size.large};
			line-height: 20px;
		`,
		medium: css`
			font-size: ${typography.size.medium};
			line-height: 18px;
		`,
		small: css`
			font-size: ${typography.size.baseSmall};
			line-height: 16px;
		`
	},
	overline: {
		large: css`
			font-size: ${typography.size.medium};
			line-height: 16px;
			letter-spacing: 1;
		`,
		small: css`
			font-size: ${typography.size.baseSmall};
			line-height: 14px;
			letter-spacing: 0.7;
		`
	}
};

export const getTypographyStyles = (type, size, color) => {
	if (!type || !size) return;

	return css`
		font-family: ${typography.fontFamily};
		${TYPOGRAPHY[type][size]};
		${DEFAULT_TYPOGRAPHY[type]};
		color: ${colors[color]};
	`;
};
