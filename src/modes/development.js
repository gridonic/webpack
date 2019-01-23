const merge = require('webpack-merge');
const delve = require('dlv');

const { handlePreset } = require('../helpers');
const { devServer } = require('../options');
const { common } = require('../presets');

// @see https://webpack.js.org/guides/development/
module.exports = (options = {}) => merge({

        // @see https://webpack.js.org/concepts/mode/
        mode: 'development',

        // @see https://webpack.js.org/configuration/devtool/
        devtool: 'inline-source-map',

        // In most cases the output path is also the content base for the
        // webpack dev-server.
        //
        // @see https://webpack.js.org/configuration/dev-server/
        devServer: devServer(
            merge({ contentBase: delve(options, 'output.path') }, options.devServer)
        )

    },

    // Merge presets that are available
    // by default in development/production
    common(options),

    // Merge any presets given by user configuration
    ...delve(options, 'presets', []).map(handlePreset)
);
