import babel from '@rollup/plugin-babel';
import replace from '@rollup/plugin-replace';
import commonjs from '@rollup/plugin-commonjs';
import json from '@rollup/plugin-json';
import { nodeResolve } from '@rollup/plugin-node-resolve';

export default (env) => [
	replace({
		'process.env.NODE_ENV': JSON.stringify(env),
		preventAssignment: true
	}),
	babel({
		babelHelpers: 'bundled',
		exclude: /node_modules\/(?!react-collapsed)/,
		extensions: ['.js', '.jsx'],
		presets: [
			'@babel/preset-react',
			[
				'@babel/preset-env',
				{
					targets: {
						browsers: ['ie 11', 'last 2 versions']
					},
					useBuiltIns: 'usage',
					corejs: 3
				}
			]
		],
		plugins: [
			'@babel/plugin-proposal-optional-chaining',
			'@babel/plugin-proposal-nullish-coalescing-operator',
			'babel-plugin-styled-components',
			env === 'production' && 'babel-plugin-transform-react-remove-prop-types'
		].filter(Boolean)
	}),
	nodeResolve({
		moduleDirectories: ['node_modules', 'src'],
		extensions: ['.js', '.jsx']
	}),
	commonjs({ exclude: ['node_modules'] }),
	json()
];
