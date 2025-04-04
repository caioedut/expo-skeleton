import js from '@eslint/js';
import perfectionist from 'eslint-plugin-perfectionist';
import pluginReact from 'eslint-plugin-react';
import pluginReactCompiler from 'eslint-plugin-react-compiler';
import globals from 'globals';
import tseslint from 'typescript-eslint';

export default tseslint.config(
  {
    files: ['**/*.{js,mjs,cjs,ts,jsx,tsx}'],
  },

  {
    files: ['**/*.{js,mjs,cjs,ts,jsx,tsx}'],
    languageOptions: { globals: globals.browser },
  },

  js.configs.recommended,
  {
    rules: {
      'no-empty': ['error', { allowEmptyCatch: true }],
      radix: ['warn', 'as-needed'],
    },
  },

  tseslint.configs.recommended,
  {
    rules: {
      '@typescript-eslint/ban-ts-comment': 'off',
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/no-require-imports': [
        'error',
        {
          allow: ['\\.png$', '\\.jpg$', '\\.jpeg$', '\\.gif$', '\\.svg$', '\\.ttf$'],
        },
      ],
      '@typescript-eslint/no-unused-vars': [
        'warn',
        {
          ignoreRestSiblings: true,
        },
      ],
    },
  },

  pluginReact.configs.flat.recommended,
  {
    rules: {
      'react/jsx-curly-brace-presence': ['error', 'never'],
      'react/jsx-no-target-blank': 'off',
      'react/no-unescaped-entities': 'off',
      'react/react-in-jsx-scope': 'off',
    },
    settings: {
      react: {
        version: 'detect',
      },
    },
  },

  pluginReactCompiler.configs.recommended,

  perfectionist.configs['recommended-natural'],
  {
    rules: {
      'perfectionist/sort-modules': 'off',

      'perfectionist/sort-imports': [
        'error',
        {
          internalPattern: ['^@/'],
          newlinesBetween: 'always',
          customGroups: {
            type: {
              dotenv: ['^dotenv'],
              metro: ['^@expo/metro-runtime$'],
              react: ['^react$', '^react-native$'],
              runtime: ['^node:', '^deno:', '^bun:', '^std:', '^window:', '^kaluma:', '^workers:'],
            },
            value: {
              dotenv: ['^dotenv'],
              metro: ['^@expo/metro-runtime$'],
              react: ['^react$', '^react-native$'],
              runtime: ['^node:', '^deno:', '^bun:', '^std:', '^window:', '^kaluma:', '^workers:'],
            },
          },
          groups: [
            'metro',
            'dotenv',
            'runtime',
            'type',
            'react',
            ['builtin', 'external'],
            'internal-type',
            'internal',
            ['parent-type', 'sibling-type', 'index-type'],
            ['parent', 'sibling', 'index'],
            'side-effect',
            'style',
            'object',
            'unknown',
          ],
        },
      ],

      'perfectionist/sort-jsx-props': [
        'error',
        {
          groups: ['react', 'id', 'className', 'shorthand', 'unknown', 'multiline', 'callback'],
          customGroups: {
            id: '^id$',
            className: '^className$',
            react: ['^key$', '^ref$'],
            callback: ['^get.+', '^set.+', '^on.+', 'callback'],
          },
        },
      ],

      'perfectionist/sort-object-types': [
        'error',
        {
          groups: ['id', 'names', 'unknown', 'multiline', 'callback'],
          customGroups: {
            id: '^id$',
            names: ['name', 'title', 'label', 'pathname'],
            callback: ['^get.+', '^set.+', '^on.+', 'callback'],
          },
        },
      ],

      'perfectionist/sort-objects': [
        'error',
        {
          groups: ['id', 'names', 'unknown', 'multiline', 'callback'],
          customGroups: {
            id: '^id$',
            names: ['name', 'title', 'label', 'pathname'],
            callback: ['^get.+', '^set.+', '^on.+', 'callback'],
          },
        },
      ],
    },
  },
);
