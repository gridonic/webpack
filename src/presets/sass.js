const miniCssExtract = require('../plugins/miniCssExtract');

module.exports = ({ extractCss = false } = {}) => ({
    plugins:  extractCss === true ? [miniCssExtract()] : [],
    module: {
        rules: [{
            test: /\.s(a|c)ss$/,
            use: [
                // @see https://github.com/webpack-contrib/style-loader
                extractCss === true ? miniCssExtract().constructor.loader : 'style-loader',

                // @see https://github.com/webpack-contrib/css-loader
                'css-loader',

                // @see https://github.com/webpack-contrib/sass-loader
                'sass-loader'
            ]
        }]
    }
});
