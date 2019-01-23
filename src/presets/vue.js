const delve = require('dlv');

// @see https://vue-loader.vuejs.org/
const VueLoaderPlugin = require('vue-loader/lib/plugin');

const defaults = {
    test: /\.vue$/,

    // @see https://eslint.org/docs/developer-guide/nodejs-api#cliengine
    eslint: {
        fix: true
    }
};

module.exports = (options = {}) => {
    const result = {
        module: {
            rules: [{
                test: delve(options, 'test', defaults.test),

                // @see https://github.com/vuejs/vue-loader
                use: ['vue-loader']
            }]
        },
        plugins: [
            new VueLoaderPlugin({
                productionMode: options.mode === 'production'
            })
        ]
    };

    // Enable linting in production
    if (delve(options, 'mode') === 'production') {
        result.module.rules[0].use.push({
            loader: 'eslint-loader',
            options: {
                fix: delve(options, 'eslint.fix', defaults.eslint.fix)
            }
        });
    }

    return result;
};
