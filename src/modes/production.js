const { entry, output } = require('../options');
const { clean, html, friendlyErrors } = require('../plugins');

// @see https://webpack.js.org/guides/production/
module.exports = (options = {}) => ({

    // @see https://webpack.js.org/concepts/mode/
    mode: 'production',

    entry,

    // @see https://webpack.js.org/configuration/devtool/
    // @see https://webpack.js.org/guides/production/#source-mapping
    devtool: 'source-map',

    // @see https://webpack.js.org/configuration/plugins/
    plugins: [
        friendlyErrors(),
        clean(options.clean),
        html(options.html)
    ],

    // @see https://webpack.js.org/configuration/output/
    output: Object.assign({}, output, {
        filename: '[name].[hash].js'
    })
});
