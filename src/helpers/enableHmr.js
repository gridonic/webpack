// @see https://github.com/webpack/webpack
const webpack = require('webpack');

module.exports = ({ protocol, host, port, webpackConfig }) => {
    const hotEntries = [
        `webpack-dev-server/client?${protocol}://${host}:${port}/`,
        'webpack/hot/dev-server'
    ];

    // @see https://webpack.js.org/plugins/hot-module-replacement-plugin/
    webpackConfig.plugins.push(new webpack.HotModuleReplacementPlugin());

    // If webpack entry is a string,
    // convert it into an array.
    if (typeof webpackConfig.entry === 'string') {
        webpackConfig.entry = [
            ...hotEntries,
            webpackConfig.entry
        ];

        return;
    }

    // If webpack entry is an array/object,
    // inject the hot entries for each entry.
    Object
        .entries(webpackConfig.entry)
        .forEach(([key, value]) => {
            webpackConfig.entry[key] = [
                ...hotEntries,
                value
            ];
        });
};
