const merge = require('webpack-merge');
const delve = require('dlv');

const { clean, html, hmr, friendlyErrors, errorOverlay } = require('../plugins');
const { entry, output, resolve } = require('../options');

module.exports = (options = {}) => ({

    // @see https://webpack.js.org/configuration/entry-context/
    entry: entry(options.entry),

    // @see https://webpack.js.org/configuration/resolve/
    resolve: resolve(options.resolve),

    // @see https://webpack.js.org/configuration/plugins/
    plugins: [
        friendlyErrors(),
        errorOverlay(),
        clean(
            merge({
                path: delve(options, 'output.path'),
                root: delve(options, 'context')
            }, options.clean)
        ),
        html(options.html), // @todo How to handle multiple html files?
        hmr(options.hmr)
    ],

    // @see https://webpack.js.org/configuration/output/
    output: output(options.output)
});
