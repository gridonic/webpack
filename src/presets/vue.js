// @see https://github.com/survivejs/webpack-merge
const merge = require('webpack-merge');

// @see https://github.com/developit/dlv
const delve = require('dlv');

// @see https://github.com/martinandert/except
const except = require('except');

// @see https://github.com/sindresorhus/import-cwd
const importCwd = require('import-cwd');

// @see https://vue-loader.vuejs.org/
const VueLoaderPlugin = require('vue-loader/lib/plugin');

const eslint = require('./eslint');
const localRequire = require('../helpers/localRequire');

const defaults = {
    test: /\.vue$/
};

module.exports = (options = {}, webpackOptions = {}) => {

    // Automatic installtion of vue dependencies has been disabled
    if (options.noInstall !== true) {

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
    }

    webpackOptions = merge(webpackOptions, {
        presets: {
            html: {
                template: './src/html/index.ejs'
            }
        }
    });

    return merge({
        output: {

            // Setting this to root '/' eliminates any potential hiccups when
            // you are going to use vue-router.
            publicPath: '/'

        },
        devServer: {

            // In conjunction with the vue-router it makes sense to redirect
            // all 404’s to the index.html.
            //
            // @see https://github.com/vuejs/vue-router/issues/1277
            // @see https://webpack.js.org/configuration/dev-server/#devserverhistoryapifallback
            historyApiFallback: true

        },
        resolve: {
            extensions: ['.vue']
        },
        module: {
            rules: [{
                test: delve(options, 'test', defaults.test),

                // @see https://github.com/vuejs/vue-loader
                use: {
                    loader: 'vue-loader',

                    // @see https://vue-loader.vuejs.org/options.html
                    options: merge({
                        compiler: importCwd('vue-template-compiler')
                    }, except(options, 'test', 'mode'))
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
        // @see https://vue-loader.vuejs.org/guide/#manual-configuration
        // @see https://github.com/vuejs/vue-loader/issues/1520
        merge({
            mode: options.mode,
            test: delve(options, 'test', defaults.test)
        }, webpackOptions.eslint)
    ));
};
