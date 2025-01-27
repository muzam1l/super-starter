/** @type {import("eslint").Linter.Config} */

module.exports = {
  root: true,
  extends: [require.resolve('@{workspace}/eslint-config/react')],
};
