import peerDepsExternal from 'rollup-plugin-peer-deps-external';
import generatePackageJson from 'rollup-plugin-generate-package-json';
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
			copy({ targets: [{ src: 'README.md', dest: 'dist' }] }),
			generatePackageJson({
				outputFolder: 'dist',
				baseContents: (pkg) => {
					const { name, homepage, bugs, repository, version, dependencies, peerDependencies } = pkg;

					return {
						main: 'index.umd.js',
						name,
						homepage,
						bugs,
						repository,
						version,
						dependencies,
						peerDependencies
					};
				}
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
