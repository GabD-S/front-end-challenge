/** @type {import('eslint').Linter.Config} */
module.exports = {
  root: true,
  extends: [
    'expo',
    'plugin:prettier/recommended',
  ],
  env: {
    node: true,
    es2022: true,
    jest: true,
  },
  rules: {
    'prettier/prettier': ['error', { endOfLine: 'auto' }],
    'no-unused-vars': ['warn', { argsIgnorePattern: '^_' }],
  },
};
