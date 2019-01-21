const delve = require('dlv');

const miniCssExtract = require('../plugins/miniCssExtract');

const defaults = {
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
                    'css-loader'
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
