import serve from 'rollup-plugin-serve';
import livereload from 'rollup-plugin-livereload';
import plugins from './plugins';
import json from '@rollup/plugin-json';

const ENV = 'development';

export default [
	{
		input: 'src/components/index.js',
		output: {
			name: 'main',
			file: 'dev/index.umd.js',
			format: 'umd',
			sourcemap: true
		},
		plugins: plugins(ENV)
	},
	{
		input: 'example/index.js',
		output: {
			name: 'main',
			file: 'dev/example.umd.js',
			format: 'umd',
			sourcemap: true
		},
		plugins: [
			...plugins(ENV),
			serve({
				open: true,
				verbose: true,
				contentBase: ['example', 'dev'],
				host: 'localhost',
				port: 3000
			}),
			livereload({ watch: 'dev' }),
			json()
		]
	}
];
