const merge = require('webpack-merge');

const { common, css, sass } = require('../presets');

// @see https://webpack.js.org/guides/production/
module.exports = (options = {}) => merge({

        // @see https://webpack.js.org/concepts/mode/
        mode: 'production',

        // @see https://webpack.js.org/configuration/devtool/
        // @see https://webpack.js.org/guides/production/#source-mapping
        devtool: 'source-map'

    },
    common(
        merge({
            output: {
                filename: '[name].[hash].js'
            }
        }),
        options
    ),
    css(
        merge({
            extract: true,
            filename: '[name].[hash].css'
        }, options.css)
    ),
    sass()
);
