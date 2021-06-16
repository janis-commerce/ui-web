import serve from 'rollup-plugin-serve';
import livereload from 'rollup-plugin-livereload';
import babel from '@rollup/plugin-babel';
import commonjs from '@rollup/plugin-commonjs';
import replace from '@rollup/plugin-replace';
import peerDepsExternal from 'rollup-plugin-peer-deps-external';
import includePaths from 'rollup-plugin-includepaths';
import { nodeResolve } from '@rollup/plugin-node-resolve';

const commonPlugins = [
	includePaths({ paths: './src' }),
	nodeResolve({
		extensions: ['.js']
	}),
	replace({
		'process.env.NODE_ENV': JSON.stringify('production')
	}),
	babel({
		presets: ['@babel/preset-react'],
		plugins: ['babel-plugin-styled-components']
	}),
	commonjs()
];

export default [
	{
		input: 'src/web/index.js',
		output: {
			name: 'main',
			file: 'dist/index.umd.js',
			format: 'umd',
			sourcemap: true
		},
		plugins: [peerDepsExternal(), ...commonPlugins]
	},
	{
		input: 'example/index.js',
		output: {
			name: 'main',
			file: 'dist/example.umd.js',
			format: 'umd',
			sourcemap: true
		},
		plugins: [
			serve({
				open: true,
				verbose: true,
				contentBase: ['example', 'dist'],
				host: 'localhost',
				port: 3000
			}),
			livereload({ watch: 'dist' }),
			...commonPlugins
		]
	}
];
