/**
 * @type {import('eslint').Linter.Config}
 */
module.exports = {
  extends: ['@{workspace}/eslint-config/base', '@{workspace}/eslint-config/react']
    .map(str => require.resolve(str))
    .concat(['plugin:@next/next/recommended']),

  env: {
    node: true,
    browser: true,
  },
  globals: {
    React: true,
    JSX: true,
  },
};
