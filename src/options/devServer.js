const merge = require('webpack-merge');

const output = require('./output');
const stats = require('./stats');

// @see https://webpack.js.org/configuration/dev-server/
const defaults = {

    // @see https://webpack.js.org/configuration/dev-server/#devserver-contentbase
    contentBase: output().path,

    // @see https://webpack.js.org/configuration/dev-server/#devserver-open
    open: true,

    // @see https://webpack.js.org/configuration/stats/
    stats,

    // @see https://webpack.js.org/configuration/dev-server/#devserver-overlay
    overlay: true
};

module.exports = (options = {}) => merge(defaults, options);
