module.exports = {
  env: {
    es2021: true,
    node: true,
    browser: true,
  },
  extends: ['eslint:recommended', 'plugin:vue/essential', '@vue/prettier'],
  parserOptions: {
    ecmaVersion: 12,
    sourceType: 'module',
  },
  rules: {
    'no-console': 'off',
    'no-debugger': 'off',
    'no-unused-vars': 'off',
    'no-restricted-syntax': 'off',
    'no-param-reassign': 'off',
    'import/no-self-import': 'off',
    'max-len': 'off',
    'import/prefer-default-export': 'off',
    'prettier/prettier': 'off',
  },
  parser: '',
  plugins: ['vue'],
};
