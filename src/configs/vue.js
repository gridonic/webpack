const { babel, eslint } = require('./es6');

module.exports = {
    babel,
    eslint: (options = {}) => {
        const result = eslint(options);

        // @see https://github.com/vuejs/eslint-plugin-vue
        // @see https://vuejs.github.io/eslint-plugin-vue/rules/
        result.extends.unshift('plugin:vue/recommended');

        return result;
    }
};
