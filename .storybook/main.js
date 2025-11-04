const path = require('path');

module.exports = {
	stories: ['../src/**/*.stories.mdx', '../src/**/*.stories.@(js|jsx|ts|tsx)'],
	addons: [
		'@storybook/addon-actions',
		'@storybook/addon-controls',
		'@storybook/addon-essentials'
	],
	webpackFinal: async (config) => {
		config.resolve.modules = [path.resolve(process.cwd(), 'src'), 'node_modules'];

		// .mjs files support
		config.module.rules.push({
			test: /\.mjs$/,
			include: /node_modules/,
			type: 'javascript/auto'
		});
		const babelRule = config.module.rules.find(
			(rule) => rule.test && rule.test.toString().includes('jsx')
		);
		if (babelRule) babelRule.exclude = /node_modules\/(?!react-collapsed)/;
		config.resolve.extensions.push('.mjs');

		return config;
	}
};
