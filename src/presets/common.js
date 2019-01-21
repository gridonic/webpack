const merge = require('webpack-merge');
const delve = require('dlv');

const { clean, html, hmr, friendlyErrors, errorOverlay } = require('../plugins');
const { entry, output, resolve } = require('../options');

const css = require('./css');
const sass = require('./sass');
const babel = require('./babel');

module.exports = (options = {}) => merge({

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

},
    css(merge({ mode: options.mode }, options.css)),
    sass(merge({ mode: options.mode }, options.sass)),
    babel(merge({ mode: options.babel }, options.babel))
);
