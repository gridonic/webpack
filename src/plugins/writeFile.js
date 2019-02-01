// @see https://github.com/gajus/write-file-webpack-plugin
const WriteFilePlugin = require('write-file-webpack-plugin');

module.exports = (options = {}) => new WriteFilePlugin(options);
