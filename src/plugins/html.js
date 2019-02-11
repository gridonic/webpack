const merge = require('webpack-merge');

const pkg = require('../../package.json');

// @see https://webpack.js.org/plugins/html-webpack-plugin/
// @see https://github.com/jantimon/html-webpack-plugin
const HtmlWebpackPlugin = require('html-webpack-plugin');

const defaults = {
    title: pkg.name
};

module.exports = (options = {}) => new HtmlWebpackPlugin(merge(defaults, options));
