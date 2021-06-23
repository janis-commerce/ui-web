import peerDepsExternal from 'rollup-plugin-peer-deps-external';
import plugins from './plugins';

const ENV = 'production';

export default [
	{
		input: 'src/web/components/index.js',
		output: {
			name: 'main',
			file: 'dist/index.umd.js',
			format: 'umd',
			sourcemap: true
		},
		plugins: [peerDepsExternal(), ...plugins(ENV)]
	}
];
