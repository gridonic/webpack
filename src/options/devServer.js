const output = require('./output');

// @see https://webpack.js.org/configuration/dev-server/
module.exports = {

    // @see https://webpack.js.org/configuration/dev-server/#devserver-contentbase
    contentBase: output.path,

    // @see https://webpack.js.org/configuration/dev-server/#devserver-hot
    // @see https://webpack.js.org/concepts/hot-module-replacement/
    // @see https://webpack.js.org/guides/hot-module-replacement/
    hot: true,

    // @see https://webpack.js.org/configuration/dev-server/#devserver-open
    open: true,

    // @see https://webpack.js.org/configuration/dev-server/#devserver-noinfo-
    noInfo: true
};
