module.exports = {
	env: {
		browser: true,
		es2021: true,
		jest: true,
		node: true
	},
	extends: ['eslint:recommended', 'plugin:prettier/recommended', 'plugin:react/recommended'],
	parser: '@babel/eslint-parser',
	parserOptions: {
		sourceType: 'module'
	},
	plugins: ['@babel', 'prettier'],
	rules: {
		'import/prefer-default-export': 'off',
		'react/react-in-jsx-scope': 'off'
	},
	settings: {
		react: {
			version: '17.x'
		},
		'import/resolver': {
			node: {
				extensions: ['.js', '.jsx', '.json'],
				moduleDirectory: ['node_modules', 'src']
			}
		}
	}
};
