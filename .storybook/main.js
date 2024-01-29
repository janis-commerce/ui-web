const path = require('path');

module.exports = {
	stories: ['../src/**/*.stories.mdx', '../src/**/*.stories.@(js|jsx|ts|tsx)'],
	addons: ['@storybook/addons', '@storybook/addon-essentials', 'storybook-dark-mode'],
	webpackFinal: async (config) => {
		config.resolve.modules = [path.resolve(process.cwd(), 'src'), 'node_modules'];
		return config;
	}
};
