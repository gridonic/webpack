// @see https://github.com/survivejs/webpack-merge
const merge = require('webpack-merge');

const env = require('../helpers/env');

const defaults = {

    // @see https://webpack.js.org/configuration/dev-server/#devserverhttps
    // @see https://nodejs.org/api/tls.html
    https: {
        ca: env('SSL_CA', '/usr/local/etc/httpd/ssl/ca.pem'),
        cert: env('SSL_CERT', '/usr/local/etc/httpd/ssl/server.crt'),
        key: env('SSL_KEY', '/usr/local/etc/httpd/ssl/server.key')
    },

    // @see https://webpack.js.org/configuration/dev-server/#devserverheaders
    headers: {

        // Allow access from any origin during development.
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': '*',

    },

    // @see https://webpack.js.org/configuration/dev-server/#devserverdisablehostcheck
    // @todo Properly explain why we disable this?
    disableHostCheck: true
};

module.exports = (options) => {
    return {
        devServer: merge(defaults, options.devServer)
    };
};
