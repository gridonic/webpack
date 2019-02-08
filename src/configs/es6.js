const merge = require('webpack-merge');

const babel = {
    presets: [

        // @see https://babeljs.io/docs/en/babel-preset-env
        ['@babel/preset-env', {

            // @see https://babeljs.io/docs/en/babel-preset-env#usebuiltins
            useBuiltIns: 'usage',

            // @see https://babeljs.io/docs/en/babel-preset-env#modules
            modules: false,

            // @see https://babeljs.io/docs/en/babel-preset-env#exclude
            exclude: [
                'transform-regenerator',
                'transform-async-to-generator'
            ]
        }]
    ],
    plugins: [
        // @see https://github.com/MatAtBread/fast-async
        'module:fast-async',

        // @see https://babeljs.io/docs/en/babel-plugin-proposal-object-rest-spread
        '@babel/plugin-proposal-object-rest-spread',

        // @see https://babeljs.io/docs/en/babel-plugin-syntax-dynamic-import
        '@babel/plugin-syntax-dynamic-import'
    ]
};

const eslint = {
    extends: [

        // @see https://www.npmjs.com/package/eslint-config-airbnb-base
        'airbnb-base'

    ],

    // @see https://eslint.org/docs/user-guide/configuring#specifying-environments
    env: {
        browser: true
    },

    // @see https://eslint.org/docs/user-guide/configuring#specifying-parser-options
    parserOptions: {
        ecmaVersion: 6,
        parser: 'babel-eslint',
        sourceType: 'module'
    },

    // @see https://www.npmjs.com/package/eslint-import-resolver-webpack
    settings: {
        'import/resolver': 'webpack'
    }
};

module.exports = {
    babel: (options = {}) => merge(babel, options),
    eslint: (options = {}) => merge(eslint, options)
};
