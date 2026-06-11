import js from '@eslint/js';
import eslintConfigPrettier from 'eslint-config-prettier';
import globals from 'globals';
import perfectionist from 'eslint-plugin-perfectionist';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import tseslint from 'typescript-eslint';
import { defineConfig, globalIgnores } from 'eslint/config';

export default defineConfig([
    globalIgnores(['dist']),
    {
        files: ['**/*.{ts,tsx}'],
        extends: [
            js.configs.recommended,
            tseslint.configs.recommended,
            reactHooks.configs.flat.recommended,
            reactRefresh.configs.vite,
        ],
        languageOptions: {
            globals: globals.browser,
        },
        plugins: {
            perfectionist,
        },
        rules: {
            'perfectionist/sort-imports': [
                'error',
                {
                    type: 'natural',
                    order: 'asc',
                    tsconfig: {
                        rootDir: '.',
                        filename: 'tsconfig.app.json',
                    },
                    customGroups: [
                        {
                            groupName: 'react',
                            elementNamePattern: ['^react$', '^react-.+'],
                        },
                        {
                            groupName: 'gsap',
                            elementNamePattern: ['^gsap$', '^gsap/.+', '^@gsap/.+'],
                        },
                        {
                            groupName: 'aliased-components',
                            elementNamePattern: '^@/components/.+',
                        },
                        {
                            groupName: 'aliased-styles',
                            elementNamePattern: '^@/styles/.+',
                        },
                    ],
                    groups: [
                        'side-effect',
                        'type-import',
                        'react',
                        'gsap',
                        ['value-builtin', 'value-external'],
                        'aliased-components',
                        ['type-parent', 'type-sibling', 'type-index'],
                        ['value-parent', 'value-sibling', 'value-index'],
                        'aliased-styles',
                        'style',
                        'side-effect-style',
                        'ts-equals-import',
                        'unknown',
                    ],
                },
            ],
            'perfectionist/sort-named-imports': [
                'error',
                {
                    type: 'natural',
                    order: 'asc',
                    groups: ['type-import', 'value-import'],
                },
            ],
        },
    },
    eslintConfigPrettier,
]);
