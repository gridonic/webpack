const process = require('process');

// @see https://github.com/johnagan/clean-webpack-plugin
const CleanWebpackPlugin = require('clean-webpack-plugin');

// Output is required to get current set path.
const output = require('../options/output');

module.exports = (paths = [output.path], options = {
    root: process.cwd(),
    verbose: false
}) => new CleanWebpackPlugin(paths, options);
