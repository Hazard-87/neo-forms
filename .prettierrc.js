module.exports = {
	tabWidth: 2,
	semi: false,
	trailingComma: 'none',
	singleQuote: true,
	printWidth: 100,
	overrides: [
		{
			files: '*.json',
			options: {
				printWidth: 200
			}
		}
	]
}