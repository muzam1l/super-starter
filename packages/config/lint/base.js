import * as path from 'node:path';
import { includeIgnoreFile } from '@eslint/compat';
// @ts-ignore
import eslint from '@eslint/js';
import importPlugin from 'eslint-plugin-import';
import turboPlugin from 'eslint-plugin-turbo';
import tseslint from 'typescript-eslint';

export default tseslint.config(
  includeIgnoreFile(path.join(import.meta.dirname, '../../../.gitignore')),
  { ignores: ['**/*.config.*', '**/*.d.ts'] },
  {
    files: ['**/*.js', '**/*.ts', '**/*.tsx'],
    plugins: {
      import: importPlugin,
      turbo: turboPlugin,
    },
    extends: [
      eslint.configs.recommended,
      ...tseslint.configs.recommended,
      ...tseslint.configs.recommendedTypeChecked,
      ...tseslint.configs.stylisticTypeChecked,
    ],
    rules: {
      ...turboPlugin.configs.recommended.rules,
      '@typescript-eslint/no-unused-vars': [
        'error',
        { argsIgnorePattern: '^_', varsIgnorePattern: '^_' },
      ],
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/consistent-type-imports': [
        'warn',
        { prefer: 'type-imports', fixStyle: 'inline-type-imports' },
      ],
      '@typescript-eslint/no-unnecessary-condition': [
        'error',
        {
          allowConstantLoopConditions: true,
        },
      ],
    },
  },
  {
    linterOptions: { reportUnusedDisableDirectives: true },
    languageOptions: { parserOptions: { projectService: true } },
  },
);
