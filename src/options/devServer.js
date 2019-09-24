const merge = require('webpack-merge');

const context = require('./context');

// @see https://webpack.js.org/configuration/dev-server/
const defaults = {

    // @see https://webpack.js.org/configuration/dev-server/#devserver-contentbase
    contentBase: context(),

    // @see https://webpack.js.org/configuration/dev-server/#devserver-open
    open: false,

    // @see https://webpack.js.org/configuration/dev-server/#devserver-overlay
    overlay: true,

    // @see https://webpack.js.org/configuration/dev-server/#devserver-host,
    host: '0.0.0.0',

    // @see https://webpack.js.org/configuration/dev-server/#devserver-port
    port: 8080,

    // @see https://webpack.js.org/configuration/dev-server/#devserver-hot
    // @see https://webpack.js.org/concepts/hot-module-replacement/
    // @see https://webpack.js.org/guides/hot-module-replacement/
    hot: true,

    // @see https://webpack.js.org/configuration/output/#outputpublicpath
    publicPath: '/'
};

module.exports = (options = {}) => merge(defaults, options);
