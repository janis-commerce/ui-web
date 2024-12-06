import babel from '@rollup/plugin-babel';
import replace from '@rollup/plugin-replace';
import commonjs from '@rollup/plugin-commonjs';
import json from '@rollup/plugin-json';
import { nodeResolve } from '@rollup/plugin-node-resolve';

export default (env) => [
	replace({ 'process.env.NODE_ENV': JSON.stringify(env), preventAssignment: true }),
	babel({
		babelHelpers: 'bundled',
		exclude: 'node_modules/**',
		presets: ['@babel/preset-react'],
		plugins: ['babel-plugin-styled-components', 'babel-plugin-transform-react-remove-prop-types']
	}),
	nodeResolve({ moduleDirectories: ['node_modules', 'src'] }),
	commonjs(),
	json()
];
