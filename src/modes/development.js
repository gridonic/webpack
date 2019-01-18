const { clean, html, hmr } = require('../plugins');
const { entry, output, devServer } = require('../options');

// @see https://webpack.js.org/guides/development/
module.exports = (options = {}) => ({

    // @see https://webpack.js.org/concepts/mode/
    mode: 'development',

    entry,

    // @see https://webpack.js.org/configuration/devtool/
    devtool: 'inline-source-map',

    // @see https://webpack.js.org/configuration/dev-server/
    devServer,

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
