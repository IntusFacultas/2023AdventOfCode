/** @type {import('eslint').ESLint.ConfigData} */
const config = {
    extends: ['plugin:@typescript-eslint/recommended'],
    parser: '@typescript-eslint/parser',
    parserOptions: {
        sourceType: 'module',
        project: ['./tsconfig.eslint.json'],
        tsconfigRootDir: __dirname,
        warnOnUnsupportedTypeScriptVersion: false,
    },
    plugins: [
        'prettier',
        '@typescript-eslint',
        'jest',
    ],
    rules: {
        semi: ['error', 'always'],
        indent: 'error',
        quotes: [
            'error',
            'single',
            {
                allowTemplateLiterals: true,
                avoidEscape: true,
            },
        ],
    },
    root: true,
};

module.exports = config;