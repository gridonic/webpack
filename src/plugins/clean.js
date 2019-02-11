const merge = require('webpack-merge');

const output = require('../options/output');
const context = require('../options/context');

// @see https://github.com/johnagan/clean-webpack-plugin
const CleanWebpackPlugin = require('clean-webpack-plugin');

const defaults = {
    path: output().path,
    root: context(),
    verbose: false
};

module.exports = ({ path, ...rest } = {}) => new CleanWebpackPlugin(path, merge(defaults, rest));
