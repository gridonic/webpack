const path = require('path');
const merge = require('webpack-merge');

const context = require('./context');

// @see https://webpack.js.org/configuration/resolve/
const defaults = {

    // @see https://webpack.js.org/configuration/resolve/#resolve-alias
    alias: {
        '@': path.join(context(), 'src')
    }
};

module.exports = (options = {}) => merge(defaults, options);
