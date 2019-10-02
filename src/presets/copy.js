// @see https://github.com/webpack-contrib/copy-webpack-plugin
const CopyPlugin = require('copy-webpack-plugin');

module.exports = (options = {}) => ({
    plugins: [
        new CopyPlugin(Array.isArray(options) ? options : [options])
    ]
});
