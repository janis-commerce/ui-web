import { createRequire } from 'module';
import babel from '@rollup/plugin-babel';
import replace from '@rollup/plugin-replace';
import commonjs from '@rollup/plugin-commonjs';
import json from '@rollup/plugin-json';
import postcss from 'rollup-plugin-postcss';
import { nodeResolve } from '@rollup/plugin-node-resolve';

const require = createRequire(import.meta.url);

// Los paquetes d3 (deps de @xyflow/react) declaran un `exports` abreviado
// ({ umd, default }) que node-resolve no logra mapear. Los resolvemos a mano
// vía su `main` clásico para que entren al bundle en vez de quedar externos.
const resolveD3 = {
	name: 'resolve-d3',
	resolveId(source) {
		if (/^d3-/.test(source)) return require.resolve(source);
		return null;
	}
};

export default (env) => [
	resolveD3,
	replace({
		'process.env.NODE_ENV': JSON.stringify(env),
		preventAssignment: true
	}),
	postcss({ inject: true }),
	babel({
		babelHelpers: 'bundled',
		exclude: /node_modules\/(?!react-collapsed)/,
		include: [/node_modules\/react-collapsed/, /src/],
		extensions: ['.js', '.jsx', '.mjs'],
		presets: [
			'@babel/preset-react',
			[
				'@babel/preset-env',
				{
					targets: {
						browsers: ['ie 11', 'last 2 versions']
					},
					useBuiltIns: 'usage',
					corejs: 3
				}
			]
		],
		plugins: [
			'@babel/plugin-transform-optional-chaining',
			'@babel/plugin-transform-nullish-coalescing-operator',
			'babel-plugin-styled-components',
			env === 'production' && 'babel-plugin-transform-react-remove-prop-types'
		].filter(Boolean),
		babelrc: false,
		configFile: false
	}),
	nodeResolve({
		moduleDirectories: ['node_modules', 'src'],
		extensions: ['.js', '.jsx']
	}),
	commonjs({
		transformMixedEsModules: true
	}),
	json()
];
