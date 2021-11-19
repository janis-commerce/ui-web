import { css } from 'styled-components';
import theme from './palette';

const timingFunctions = {
	standard: 'cubic-bezier(0.4, 0, 0.2, 1)',
	decelerate: 'cubic-bezier(0.0, 0.0, 0.2, 1)',
	accelerate: 'cubic-bezier(0.4, 0.0, 1, 1)'
};

const mixins = {
	flexCenter: css`
		display: flex;
		align-items: center;
		justify-content: center;
	`,
	placeholder(styles) {
		return css`
			&::-moz-placeholder {
				${styles}
			}
			&::-webkit-input-placeholder {
				${styles}
			}
			&:-moz-placeholder {
				${styles}
			}
			&:-ms-input-placeholder {
				${styles}
			}
			&::placeholder {
				${styles}
			}
		`;
	},
	transition(property = 'all', time = '200ms') {
		let transitionProperty;
		if (property.includes(',')) transitionProperty = `transition-property: ${property}`;

		const transition = `${property.split(',')[0]} ${time} ${timingFunctions.standard}`;

		return css`
			transition: ${transition};
			${transitionProperty};
		`;
	},
	scrollbar(thumbColor, shadowColor) {
		const { colors } = theme;
		return css`
			&::-webkit-scrollbar {
				width: 5px;
			}
			&::-webkit-scrollbar-track {
				box-shadow: inset 0 0 6px ${shadowColor || colors.white};
			}
			&::-webkit-scrollbar-thumb {
				height: 5px;
				width: 4px;
				border-radius: 50px;
				background-color: ${thumbColor};
			}
		`;
	}
};

export default mixins;
