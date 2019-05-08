// @see https://github.com/survivejs/webpack-merge
const merge = require('webpack-merge');

// @see https://github.com/webpack-contrib/stylelint-webpack-plugin
const StyleLintPlugin = require('stylelint-webpack-plugin');

const defaults = {
    failOnError: true
};

module.exports = (options = {}) => {
    if (options === false) {
        return false;
    }

    return new StyleLintPlugin(
        merge(
            defaults,
            options
        )
    );
};
