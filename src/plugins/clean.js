const merge = require('webpack-merge');

// @see https://github.com/johnagan/clean-webpack-plugin
const CleanWebpackPlugin = require('clean-webpack-plugin');

const defaults = {
    verbose: false
};

module.exports = (options = {}) => {
    return new CleanWebpackPlugin(
        merge(
            defaults.options,
            options
        )
    );
};
