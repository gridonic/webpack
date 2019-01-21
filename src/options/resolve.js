const path = require('path');
const delve = require('dlv');

const context = require('./context');

const defaults = {
    alias: {
        '@': path.join(context(), 'src')
    }
};

// @see https://webpack.js.org/configuration/resolve/
module.exports = (options = {}) => ({

    // @see https://webpack.js.org/configuration/resolve/#resolve-alias
    alias: {
        '@': delve(options, 'alias.@', defaults.alias['@'])
    }

});
