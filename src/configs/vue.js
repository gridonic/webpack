const merge = require('webpack-merge');
const { babel, eslint } = require('./es6');

module.exports = {
    babel,
    eslint: (options = {}) => eslint(

        // @see https://github.com/vuejs/eslint-plugin-vue
        // @see https://vuejs.github.io/eslint-plugin-vue/rules/
        merge({ extends: ['plugin:vue/recommended'] }, options)

    )
};
