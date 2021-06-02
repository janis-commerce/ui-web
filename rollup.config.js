import serve from 'rollup-plugin-serve';
import livereload from 'rollup-plugin-livereload';
import babel from '@rollup/plugin-babel';
import commonjs from '@rollup/plugin-commonjs';
import replace from '@rollup/plugin-replace';
import peerDepsExternal from 'rollup-plugin-peer-deps-external';
import includePaths from 'rollup-plugin-includepaths';
import { nodeResolve } from '@rollup/plugin-node-resolve';

export default {
	input: 'src/web/index.js',
	output: {
		name: 'main',
		file: 'dist/index.umd.js',
		format: 'umd',
		sourcemap: true
	},
	plugins: [
		peerDepsExternal(),
		includePaths({ paths: './src' }),
		nodeResolve({
			extensions: ['.js']
		}),
		replace({
			'process.env.NODE_ENV': JSON.stringify('production')
		}),
		babel({
			presets: ['@babel/preset-react']
		}),
		commonjs(),
		serve({
			open: true,
			verbose: true,
			contentBase: ['', 'public'],
			host: 'localhost',
			port: 3000
		}),
		livereload({ watch: 'dist' })
	]
};
