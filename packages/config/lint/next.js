import nextPlugin from '@next/eslint-plugin-next';
import react from './react.js';

/* @type {Awaited<import('typescript-eslint').Config>} */
// --skipping above
export default [
  ...react,
  {
    files: ['**/*.ts', '**/*.tsx'],
    plugins: {
      '@next/next': nextPlugin,
    },
    rules: {
      ...nextPlugin.configs.recommended.rules,
      ...nextPlugin.configs['core-web-vitals'].rules,
    },
  },
];
