/**
 * @type {import('eslint').Linter.Config}
 */
module.exports = {
  extends: [
    require.resolve('@{workspace}/eslint-config/base'),
    'plugin:react/recommended',
    'plugin:react/jsx-runtime',
    'plugin:react-hooks/recommended',
  ],
  settings: {
    react: {
      version: 'detect',
    },
  },
  globals: {
    JSX: true,
  },
  env: {
    browser: true,
  },
  ignorePatterns: ['.eslintrc.js', '**/*.css'],
  overrides: [
    {
      files: ['*.config.js', '*.cjs'],
      env: {
        node: true,
      },
    },
  ],
};
