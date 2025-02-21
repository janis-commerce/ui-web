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
		exclude: 'node_modules/**',
		extensions: ['.js', '.jsx'],
		presets: [
			'@babel/preset-react',
			[
				'@babel/preset-env',
				{
					targets: '> 0.25%, not dead',
					useBuiltIns: 'usage',
					corejs: 3
				}
			]
		],
		plugins: [
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
