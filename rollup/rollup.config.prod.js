import peerDepsExternal from 'rollup-plugin-peer-deps-external';
import plugins from './plugins';

const ENV = 'production';

export default [
	{
		input: 'src/components/index.js',
		output: {
			name: 'main',
			file: 'dist/index.umd.js',
			format: 'umd',
			sourcemap: true
		},
		plugins: [...plugins(ENV), peerDepsExternal()]
	},
	{
		input: 'src/components/index.js',
		output: {
			file: 'dist/index.esm.js',
			format: 'es',
			sourcemap: true
		},
		plugins: [...plugins(ENV), peerDepsExternal()]
	}
];
