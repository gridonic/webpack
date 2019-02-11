const delve = require('dlv');
const merge = require('webpack-merge');
const except = require('except');

const { handlePreset } = require('../helpers');
const { common } = require('../presets');
const { devServer } = require('../options');

// @see https://webpack.js.org/guides/development/
module.exports = (options = {}) => merge({

        // @see https://webpack.js.org/concepts/mode/
        mode: 'development',

        // @see https://webpack.js.org/configuration/devtool/
        devtool: 'inline-source-map',

        // @see https://webpack.js.org/configuration/dev-server/
        devServer: devServer(options.devServer)

    },

    // Apply common presets that are available
    // by default in development/production
    common(
        except(options, 'devServer', 'presets')
    ),

    // Apply any presets given by user configuration
    ...delve(options, 'presets', []).map(handlePreset)
);
