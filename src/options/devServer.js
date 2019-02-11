const merge = require('webpack-merge');

const stats = require('./stats');
const context = require('./context');

// @see https://webpack.js.org/configuration/dev-server/
const defaults = {

    // @see https://webpack.js.org/configuration/dev-server/#devserver-contentbase
    contentBase: context(),

    // @see https://webpack.js.org/configuration/dev-server/#devserver-open
    open: true,

    // @see https://webpack.js.org/configuration/stats/
    stats,

    // @see https://webpack.js.org/configuration/dev-server/#devserver-overlay
    overlay: true,

    // @see https://webpack.js.org/configuration/dev-server/#devserver-host,
    host: '0.0.0.0'
};

module.exports = (options = {}) => merge(defaults, options);
