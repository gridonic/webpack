// @see https://github.com/survivejs/webpack-merge
const merge = require('webpack-merge');

// @see https://github.com/developit/dlv
const delve = require('dlv');

module.exports = (options = {}, webpackOptions = {}) => {
    return {
        output: {

            // Path where assets should be bundled to
            path: delve(options, 'assetsPath'),

            // Public path
            publicPath: options.mode !== 'production'
                ? `http://localhost:${delve(webpackOptions, 'devServer.port', 8080)}/`
                : delve(options, 'publicPath')

        },
        devServer: {

            // By default assets should be written to disk as Statamic
            // projects are served via vhost.
            writeToDisk: true,

            // Make sure HMR client always connects to localhost by default
            public: 'localhost',

            allowedHosts: [
                delve(options, 'vhost')
            ]
        },
    };
};
