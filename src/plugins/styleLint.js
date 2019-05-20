// @see https://github.com/survivejs/webpack-merge
const merge = require('webpack-merge');

// @see https://github.com/webpack-contrib/stylelint-webpack-plugin
const StyleLintPlugin = require('stylelint-webpack-plugin');

// @see https://github.com/davidtheclark/cosmiconfig
const cosmiconfig = require('cosmiconfig');

const defaults = {};

module.exports = (options = {}) => {
    const stylelintConfig = cosmiconfig('stylelint');

    if (options === false || stylelintConfig.searchSync() === null) {
        return false;
    }

    return new StyleLintPlugin(
        merge(
            defaults,
            options
        )
    );
};
