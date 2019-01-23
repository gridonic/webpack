const delve = require('dlv');
const merge = require('webpack-merge');

// @see https://vue-loader.vuejs.org/
const VueLoaderPlugin = require('vue-loader/lib/plugin');

const eslint = require('./eslint');

const defaults = {
    test: /\.vue$/
};

module.exports = (options = {}) => merge({
    module: {
        rules: [{
            test: delve(options, 'test', defaults.test),

            // @see https://github.com/vuejs/vue-loader
            use: 'vue-loader'
        }]
    },
    plugins: [
        new VueLoaderPlugin({
            productionMode: options.mode === 'production'
        })
    ]
}, eslint(

    // @todo Why is vue-loader not picking this from our js preset?
    // @see https://vue-loader.vuejs.org/guide/#manual-configuration
    merge({
        mode: options.mode,
        test: delve(options, 'test', defaults.test)
    }, options.eslint)
));
