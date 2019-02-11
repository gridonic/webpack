const path = require('path');
const merge = require('webpack-merge');

const context = require('./context');

// @see https://webpack.js.org/configuration/output/
const defaults = {

    // @see https://webpack.js.org/configuration/output/#output-path
    path: path.join(context(), 'public'),

    // @see https://webpack.js.org/configuration/output/#output-filename
    filename: '[name].js'
};

module.exports = (options = {}) => merge(defaults, options);
