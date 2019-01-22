const merge = require('webpack-merge');
const delve = require('dlv');

const { common } = require('../presets');

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

    // Merge presets that are available
    // by default in development/production
    common(merge(defaults, options)),

    // Merge any presets given by user configuration
    ...delve(options, 'presets', [])
);
