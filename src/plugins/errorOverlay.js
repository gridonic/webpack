// @see https://github.com/smooth-code/error-overlay-webpack-plugin
const ErrorOverlayPlugin = require('error-overlay-webpack-plugin');

module.exports = (options = {}) => new ErrorOverlayPlugin(options);
