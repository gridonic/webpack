const webpack = require('webpack');

module.exports = (options = {}) => new webpack.HotModuleReplacementPlugin(options);
