const pkg = require('../../package.json');

// @see https://webpack.js.org/plugins/html-webpack-plugin/
// @see https://github.com/jantimon/html-webpack-plugin
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = (options = {
    title: pkg.name
}) => new HtmlWebpackPlugin(options);
