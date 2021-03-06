module.exports = {
  'root': true,
	'env': {
		'browser': true,
		'es2021': true
	},
	'extends': [
		'eslint:recommended',
		'plugin:vue/essential'
	],
	'parserOptions': {
		'ecmaVersion': 12,
		'sourceType': 'module'
	},
	'plugins': [
		'vue', 'html'
	],
	'rules': {
		'indent': [
			'error',
			2
		],
		'linebreak-style': [
			'error',
			'unix'
		],
		'quotes': [
			'error',
			'single'
		],
		'semi': [
			'error',
			'always'
		]
	}
};
