// @see https://github.com/webpack-contrib/mini-css-extract-plugin
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = (options = {}) => new MiniCssExtractPlugin(options);
