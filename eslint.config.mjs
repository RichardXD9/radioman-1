import js from '@eslint/js';
import reactRecommended from 'eslint-plugin-react/configs/recommended.js';
import reactHooks from 'eslint-plugin-react-hooks';
import next from 'eslint-config-next';
import typescript from '@typescript-eslint/eslint-plugin';
import typescriptParser from '@typescript-eslint/parser';

export default [
  {
    files: ['**/*.{js,jsx,ts,tsx}'],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      parser: typescriptParser,
      parserOptions: {
        ecmaFeatures: {
          jsx: true
        }
      },
      globals: {
        // Add any global variables here
      }
    },
    plugins: {
      '@typescript-eslint': typescript,
      'react-hooks': reactHooks
    },
    extends: [
      js.configs.recommended,
      next,
      reactRecommended,
      ...typescript.configs.recommended
    ],
    rules: {
      'react/react-in-jsx-scope': 'off',
      'react/prop-types': 'warn',
      '@typescript-eslint/no-unused-vars': 'warn'
    }
  }
];