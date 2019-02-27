// @see https://github.com/survivejs/webpack-merge
const merge = require('webpack-merge');

// @see https://github.com/developit/dlv
const delve = require('dlv');

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
    const cssRule = ({ importLoaders = 1 } = {}) => ({
        test: delve(options, 'css.test', defaults.css.test),
        use: [

            // @see https://github.com/webpack-contrib/style-loader
            'style-loader',

            // @see https://github.com/webpack-contrib/css-loader
            {
                loader: 'css-loader',
                options: {

                    // @see https://github.com/webpack-contrib/css-loader#importloaders
                    importLoaders

                }
            },

            // @see https://github.com/postcss/postcss-loader
            {
                loader: 'postcss-loader',
                options: {
                    config: {
                        ctx: {
                            // @see https://github.com/postcss/postcss-loader/issues/353#issuecomment-386756190
                            mode: delve(options, 'mode', defaults.mode)
                        }
                    }
                }
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
                        options: delve(options, 'sass', defaults.sass)

                    }]
                })
            ]
        }
    };

    const extract = delve(options, 'css.extract', defaults.css.extract);

    // Create separate CSS files instead of bundling
    // them into the JavaScript files
    if (extract === true) {
        result.plugins = [miniCssExtract(options.css)];

        // Replace style-loader with mini-css-extract loader
        result.module.rules.forEach((rule) => {
            rule.use[0] = miniCssExtract().constructor.loader;
        });
    }

    return result;
};
