import peerDepsExternal from 'rollup-plugin-peer-deps-external';
import copy from 'rollup-plugin-copy';
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
		plugins: [
			...plugins(ENV),
			peerDepsExternal(),
			copy({
				targets: [{ src: 'README.md', dest: 'dist' }]
			})
		]
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
