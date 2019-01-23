const delve = require('dlv');
const output = require('./output');
const stats = require('./stats');

const defaults = {
    contentBase: output().path,
    hot: true,
    open: true,
    stats
};

// @see https://webpack.js.org/configuration/dev-server/
module.exports = (options = {}) => ({

    // @see https://webpack.js.org/configuration/dev-server/#devserver-contentbase
    contentBase: delve(options, 'contentBase', defaults.contentBase),

    // @see https://webpack.js.org/configuration/dev-server/#devserver-hot
    // @see https://webpack.js.org/concepts/hot-module-replacement/
    // @see https://webpack.js.org/guides/hot-module-replacement/
    hot: delve(options, 'hot', defaults.hot),

    // @see https://webpack.js.org/configuration/dev-server/#devserver-open
    open: delve(options, 'open', defaults.open),

    // @see https://webpack.js.org/configuration/stats/
    stats: delve(options, 'stats', defaults.stats),

});
