const delve = require('dlv');
const merge = require('webpack-merge');
const importCwd = require('import-cwd');

// @see https://vue-loader.vuejs.org/
const VueLoaderPlugin = require('vue-loader/lib/plugin');

const eslint = require('./eslint');
const localRequire = require('../helpers/localRequire');

const defaults = {
    test: /\.vue$/
};

module.exports = (options = {}) => {

    // Require packages that are used by this preset
    localRequire({
        'vue': '^2.5.22',
        'vue-i18n': '^8.8.0',
        'vue-router': '^3.0.2',
        'vuex': '^3.1.0'
    });

    localRequire({
        'vue-template-compiler': '^2.5.22'
    }, { dev: true });

    return merge({
        module: {
            rules: [{
                test: delve(options, 'test', defaults.test),

                // @see https://github.com/vuejs/vue-loader
                use: {
                    loader: 'vue-loader',
                    options: {
                        compiler: importCwd('vue-template-compiler')
                    }
                }
            }, {

                // @see https://kazupon.github.io/vue-i18n/guide/sfc.html
                resourceQuery: /blockType=i18n/,
                type: 'javascript/auto',
                use: [
                    '@kazupon/vue-i18n-loader',
                    'yaml-loader'
                ]
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
};
