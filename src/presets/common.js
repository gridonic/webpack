const merge = require('webpack-merge');
const delve = require('dlv');

const { clean, html, friendlyErrors, writeFile } = require('../plugins');
const { entry, output, resolve, stats } = require('../options');

const css = require('./css');
const sass = require('./sass');
const js = require('./js');
const image = require('./image');
const fonts = require('./fonts');

module.exports = (options = {}) => {
    const result = merge({

            // @see https://webpack.js.org/configuration/entry-context/
            entry: entry(options.entry),

            // @see https://webpack.js.org/configuration/resolve/
            resolve: resolve(options.resolve),

            // @see https://webpack.js.org/configuration/plugins/
            plugins: [
                friendlyErrors(),
                clean(
                    merge({
                        path: delve(options, 'output.path'),
                        root: delve(options, 'context')
                    }, options.clean)
                ),
                html(options.html) // @todo How to handleeine multiple html files?
            ],

            // @see https://webpack.js.org/configuration/output/
            output: output(options.output),

            // @see https://webpack.js.org/configuration/stats/
            stats

        },
        css(merge({ mode: options.mode }, options.css)),
        sass(merge({ mode: options.mode }, options.css, options.sass)),
        js(merge({ mode: options.mode }, options.js)),
        image(merge({ mode: options.mode }, options.image)),
        fonts(merge({ mode: options.mode }, options.fonts)),
    );

    // @see https://github.com/webpack/webpack-dev-middleware/issues/239
    if (delve(options, 'devServer.writeToDisk', false) === true) {
        result.plugins.push(writeFile());
    }

    return result;
};
