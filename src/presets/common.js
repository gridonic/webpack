// @see https://github.com/survivejs/webpack-merge
const merge = require('webpack-merge');

// @see https://github.com/developit/dlv
const delve = require('dlv');

// @see https://github.com/martinandert/except
const except = require('except');

// @see https://github.com/scottcorgan/as-array
const asArray = require('as-array');

const { clean, html, friendlyErrors } = require('../plugins');
const { entry, output, resolve, stats } = require('../options');

module.exports = (options = {}) => merge({

        // @see https://webpack.js.org/configuration/entry-context/
        entry: entry(delve(options, 'entry')),

        // @see https://webpack.js.org/configuration/resolve/
        resolve: resolve(delve(options, 'resolve')),

        // @see https://webpack.js.org/configuration/plugins/
        plugins: [
            friendlyErrors(),
            clean(
                merge({
                    path: delve(options, 'output.path'),
                    root: delve(options, 'context')
                }, delve(options, 'clean'))
            ),
            ...asArray(delve(options, 'html', {})).map(html)
        ],

        // @see https://webpack.js.org/configuration/output/
        output: output(delve(options, 'output')),

        // @see https://webpack.js.org/configuration/stats/
        stats

    },

    // Apply common presets
    require('./css')({ mode: options.mode, css: options.css, sass: options.sass }),
    require('./js')(merge({ mode: options.mode, eslint: options.eslint, babel: options.babel }, options.js)),
    require('./image')(merge({ mode: options.mode }, options.image)),
    require('./fonts')(merge({ mode: options.mode }, options.fonts)),

    // Finally we are going to apply all remaining options. Therefore we are
    // going to remove all option keys that either have been processed already
    // or are custom keys that webpack would not understand.
    except(
        options,
        'entry',
        'resolve',
        'output',
        'context',

        // Custom options…
        'clean',
        'html',
        'css',
        'sass',
        'js',
        'image',
        'fonts',
        'eslint',
        'babel'
    )
);
