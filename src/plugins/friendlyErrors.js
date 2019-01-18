// @see https://github.com/geowarin/friendly-errors-webpack-plugin
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin');

module.exports = (options = {}) => new FriendlyErrorsPlugin(options);
