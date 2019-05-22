// @see https://github.com/developit/dlv
const delve = require('dlv');

const setIfUnknown = require('../helpers/setIfUnknown');

module.exports = (options = {}, webpackOptions = {}) => {

    // Some settings need to be set as "user" settings,
    // but only if the user did not provide them
    setIfUnknown(webpackOptions, 'css.extract.filename', '[name].css');
    setIfUnknown(webpackOptions, 'devServer.host', 'localhost');
    setIfUnknown(webpackOptions, 'output.path', delve(options, 'assetsPath'));

    return {
        output: {

            // Only set public path on production. In development this will be
            // set dynamically.
            publicPath: options.mode !== 'production'
                ? null
                : delve(options, 'publicPath'),

            // Let Statamic take care of caching
            filename: '[name].js',
        },

        devServer: {

            // By default assets should be written to disk as Statamic
            // projects are served via vhost.
            writeToDisk: true,

            // Make sure HMR client always connects to localhost by default
            public: 'localhost',

            // Make sure connections from vhost are allowed to devServer
            allowedHosts: [delve(options, 'vhost')],

            // Usually we need to enable CORS since we use a vhost.
            // @see https://webpack.js.org/configuration/dev-server/#devserverheaders
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Headers': '*',
            },
        },
    };
};
