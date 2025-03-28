import eslint from '@eslint/js';
import reactRecommended from 'eslint-plugin-react/configs/recommended.js';
import reactHooks from 'eslint-plugin-react-hooks';
import next from 'eslint-config-next';

export default {
  extends: [
    eslint.configs.recommended,
    next,  // Extending Next.js ESLint configuration
    reactRecommended,
    reactHooks.recommended, // Use reactHooks.recommended instead of reactHooks directly
  ],
  languageOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    globals: {
      // Add any global variables here
    },
    parserOptions: {
      ecmaFeatures: {
        jsx: true
      }
    }
  },
  rules: {
    // Customize rules as needed
    'react/react-in-jsx-scope': 'off',
    'react/prop-types': 'warn'
  }
};
