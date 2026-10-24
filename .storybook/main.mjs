import path from 'path';

export default {
	framework: '@storybook/react-webpack5',
	stories: ['../src/**/*.stories.@(js|jsx|ts|tsx)'],
	addons: ['@storybook/addon-webpack5-compiler-babel', '@storybook/addon-docs'],
	webpackFinal: async (config) => {
		config.resolve.modules = [path.resolve(process.cwd(), 'src'), 'node_modules'];
		return config;
	}
};
