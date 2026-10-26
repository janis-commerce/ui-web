import 'regenerator-runtime/runtime';

export default {
	tags: ['autodocs'],
	parameters: {
		actions: { argTypesRegex: '^on[A-Z].*' },
		controls: {
			matchers: {
				color: /(background|color)$/i,
				date: /Date$/
			},
			sort: 'alpha'
		}
	}
};
