const delve = require('dlv');

const output = require('../options/output');
const context = require('../options/context');

// @see https://github.com/johnagan/clean-webpack-plugin
const CleanWebpackPlugin = require('clean-webpack-plugin');

const defaults = {
    path: output().path,
    root: context(),
    verbose: false
};

module.exports = (options = {}) => new CleanWebpackPlugin(
    delve(options, 'path', defaults.path), {
        root: delve(options, 'root', defaults.root),
        verbose: delve(options, 'root', defaults.verbose)
    }
);
