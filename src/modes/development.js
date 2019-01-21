const merge = require('webpack-merge');
const delve = require('dlv');

const { devServer } = require('../options');
const { common, css, sass } = require('../presets');

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
    common(options),
    css(options.css),
    sass(options.sass)
);
