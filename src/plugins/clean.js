const merge = require('webpack-merge');

const output = require('../options/output');
const context = require('../options/context');

// @see https://github.com/developit/dlv
const delve = require('dlv');

// @see https://github.com/johnagan/clean-webpack-plugin
const CleanWebpackPlugin = require('clean-webpack-plugin');

// @see https://github.com/scottcorgan/as-array
const asArray = require('as-array');

// @see https://github.com/martinandert/except
const except = require('except');

const defaults = {
    path: output().path,
    options: {
        root: context(),
        verbose: false
    }
};

module.exports = (options = {}) => {
    const path = asArray(
        delve(options, 'path', defaults.path)
    );

    return new CleanWebpackPlugin(path, merge(
        defaults.options,
        except(options, 'path')
    ));
};
