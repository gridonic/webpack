const delve = require('dlv');

const miniCssExtract = require('../plugins/miniCssExtract');

const defaults = {
    mode: 'development',
    extract: false
};

module.exports = (options = {}) => {
    const result = {
        module: {
            rules: [{
                test: /\.css$/,
                use: [
                    // @see https://github.com/webpack-contrib/style-loader
                    'style-loader',

                    // @see https://github.com/webpack-contrib/css-loader
                    {
                        loader: 'css-loader',
                        options: {
                            // @see https://github.com/webpack-contrib/css-loader#importloaders
                            importLoaders: 1
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
            }]
        }
    };

    const extract = delve(options, 'extract', defaults.extract);

    // Create separate CSS files instead of bundling
    // them into the JavaScript files
    if (extract === true) {
        result.plugins = [miniCssExtract(options)];
        result.module.rules[0].use[0] = miniCssExtract().constructor.loader;
    }

    return result;
};