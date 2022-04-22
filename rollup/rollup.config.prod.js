import peerDepsExternal from 'rollup-plugin-peer-deps-external';
import generatePackageJson from 'rollup-plugin-generate-package-json';
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
			peerDepsExternal(),
			...plugins(ENV),
			generatePackageJson({
				outputFolder: 'dist',
				baseContents: (pkg) => ({
					name: pkg.name,
					main: 'index.umd.js',
					version: pkg.version,
					dependencies: pkg.dependencies
				})
			})
		]
	}
];
