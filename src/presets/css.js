// @see https://github.com/survivejs/webpack-merge
const merge = require('webpack-merge');

// @see https://github.com/developit/dlv
const delve = require('dlv');

// @see https://github.com/martinandert/except
const except = require('except');

const miniCssExtract = require('../plugins/miniCssExtract');

const defaults = {
    mode: 'development',
    css: {
        test: /\.css$/,
        extract: false
    },
    sass: {
        test: /\.s[ac]ss$/
    }
};

module.exports = (options = {}) => {
    const isDevelopment = delve(options, 'mode', defaults.mode) === 'development';

    const cssRule = ({ importLoaders = 1 } = {}) => ({
        test: delve(options, 'css.test', defaults.css.test),
        use: [

            // @see https://github.com/webpack-contrib/style-loader
            {
                loader: 'style-loader',
                options: merge({ sourceMap: isDevelopment }, delve(options, 'style'))
            },

            // @see https://github.com/webpack-contrib/css-loader
            {
                loader: 'css-loader',
                options: merge({

                    // @see https://github.com/webpack-contrib/css-loader#importloaders
                    importLoaders,

                    sourceMap: isDevelopment
                }, except(delve(options, 'css'), 'test', 'extract'))
            },

            // @see https://github.com/postcss/postcss-loader
            {
                loader: 'postcss-loader',
                options: merge({
                    config: {
                        ctx: {
                            // @see https://github.com/postcss/postcss-loader/issues/353#issuecomment-386756190
                            mode: delve(options, 'mode', defaults.mode)
                        }
                    },
                    sourceMap: isDevelopment
                }, delve(options, 'postcss'))
            }
        ]
    });

    const result = {
        module: {
            rules: [

                // CSS rule
                cssRule(),

                // Sass rule, which is based on CSS rule
                merge(cssRule({ importLoaders: 2 }), {
                    test: delve(options, 'sass.test', defaults.sass.test),
                    use: [{

                        // @see https://github.com/webpack-contrib/sass-loader
                        loader: 'sass-loader',
                        options: merge({
                            sourceMap: isDevelopment
                        }, except(delve(options, 'sass', defaults.sass), 'test'))

                    }]
                })
            ]
        }
    };

    const extract = delve(options, 'css.extract', defaults.css.extract);

    // Create separate CSS files instead of bundling
    // them into the JavaScript files
    if (extract !== false) {
        result.plugins = [miniCssExtract(options.css.extract)];

        // Replace style-loader with mini-css-extract loader
        result.module.rules.forEach((rule) => {
            rule.use[0] = miniCssExtract().constructor.loader;
        });
    }

    return result;
};
