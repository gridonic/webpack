const merge = require('webpack-merge');

const { common, css, sass, babel } = require('../presets');

const defaults = {
    mode: 'production',
    output: {
        filename: '[name].[hash].js'
    },
    css: {
        extract: true,
        filename: '[name].[hash].css'
    }
};

// @see https://webpack.js.org/guides/production/
module.exports = (options = {}) => merge({

        // @see https://webpack.js.org/concepts/mode/
        mode: defaults.mode,

        // @see https://webpack.js.org/configuration/devtool/
        // @see https://webpack.js.org/guides/production/#source-mapping
        devtool: 'source-map'

    },
    common(
        merge({ output: defaults.output }),
        options
    ),
    css(merge({ mode: defaults.mode }, defaults.css, options.css)),
    sass(merge({ mode: defaults.mode }, defaults.css, options.sass)),
    babel(options.babel)
);
