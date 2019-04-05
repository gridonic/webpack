// @see https://github.com/developit/dlv
const delve = require('dlv');

// @see https://github.com/survivejs/webpack-merge
const merge = require('webpack-merge');

// @see https://github.com/martinandert/except
const except = require('except');

const { handlePreset } = require('../helpers');
const { common } = require('../presets');
const { devServer } = require('../options');

// @see https://webpack.js.org/guides/development/
module.exports = (options = {}) => merge({

        // @see https://webpack.js.org/concepts/mode/
        mode: 'development',

        // @see https://webpack.js.org/configuration/devtool/
        // @see https://webpack.js.org/configuration/devtool/#development
        devtool: 'eval-source-map',

    },

    // Apply any presets given by user configuration
    ...delve(options, 'presets', []).map(
        preset => handlePreset(preset, {}, options)
    ),

    // Apply development related configuration
    {
        // @see https://webpack.js.org/configuration/dev-server/
        devServer: devServer(options.devServer)
    },

    // Apply common presets that are available
    // by default in development/production
    common(
        except(options, 'presets')
    ),
);
