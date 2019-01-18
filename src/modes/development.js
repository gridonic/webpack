const { entry, output, devServer, resolve } = require('../options');
const { clean, html, hmr, friendlyErrors } = require('../plugins');

// @see https://webpack.js.org/guides/development/
module.exports = (options = {}) => ({

    // @see https://webpack.js.org/concepts/mode/
    mode: 'development',

    // @see https://webpack.js.org/configuration/entry-context/
    entry,

    // @see https://webpack.js.org/configuration/devtool/
    devtool: 'inline-source-map',

    // @see https://webpack.js.org/configuration/dev-server/
    devServer,

    // @see https://webpack.js.org/configuration/resolve/
    resolve,

    // @see https://webpack.js.org/configuration/plugins/
    plugins: [
        friendlyErrors(),
        clean(options.clean),
        html(options.html), // @todo How to handle multiple html files?
        hmr()
    ],

    // @see https://webpack.js.org/configuration/output/
    output: Object.assign({}, output, {
        filename: '[name].js'
    })
});
