const merge = require('webpack-merge');
const delve = require('dlv');
const except = require('except');

const { handlePreset } = require('../helpers');
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

    // Apply common presets that are available
    // by default in development/production
    common(
        except(merge(defaults, options), 'presets')
    ),

    // Apply any presets given by user configuration
    ...delve(options, 'presets', []).map(
        preset => handlePreset(preset, { mode: defaults.mode })
    )
);
