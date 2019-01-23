const merge = require('webpack-merge');
const delve = require('dlv');

const { clean, html, hmr, friendlyErrors, errorOverlay } = require('../plugins');
const { entry, output, resolve, stats } = require('../options');

const css = require('./css');
const sass = require('./sass');
const js = require('./js');
const image = require('./image');

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
    output: output(options.output),

    // @see https://webpack.js.org/configuration/stats/
    stats

},
    css(merge({ mode: options.mode }, options.css)),
    sass(merge({ mode: options.mode }, options.sass)),
    js(merge({ mode: options.mode }, options.js)),
    image(merge({ mode: options.mode }, options.image)),
);
