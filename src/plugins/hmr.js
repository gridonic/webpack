const webpack = require('webpack');

// @see https://webpack.js.org/plugins/hot-module-replacement-plugin/
module.exports = (options = {}) => new webpack.HotModuleReplacementPlugin(options);
