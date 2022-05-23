module.exports = {
  extends: ['prettier'],
  rules: {
    'no-unused-vars': [2, { vars: 'all' }],
    'prettier/prettier': [
      'error',
      {
        trailingComma: 'es5',
        singleQuote: true,
        printWidth: 100,
      },
    ],
  },
  plugins: ['prettier'],
  parser: 'babel-eslint',
};
