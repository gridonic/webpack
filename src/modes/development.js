const { entry, output } = require('../options');
const { clean, html, hmr } = require('../plugins');

// @see https://webpack.js.org/guides/development/
module.exports = (options = {}) => ({

    // @see https://webpack.js.org/concepts/mode/
    mode: 'development',

    entry,

    // @see https://webpack.js.org/configuration/devtool/
    devtool: 'inline-source-map',

    // @see https://webpack.js.org/configuration/dev-server/
    devServer: {

        // @see https://webpack.js.org/configuration/dev-server/#devserver-contentbase
        contentBase: output.path,

        // @see https://webpack.js.org/configuration/dev-server/#devserver-hot
        // @see https://webpack.js.org/concepts/hot-module-replacement/
        // @see https://webpack.js.org/guides/hot-module-replacement/
        hot: true,

        // @see https://webpack.js.org/configuration/dev-server/#devserver-open
        open: true
    },

    // @see https://webpack.js.org/configuration/plugins/
    plugins: [
        clean(options.clean),
        html(options.html), // @todo How to handle multiple html files?
        hmr()
    ],

    // @see https://webpack.js.org/configuration/output/
    output: Object.assign({}, output, {
        filename: '[name].js'
    })
});
