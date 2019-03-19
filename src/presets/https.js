const merge = require('webpack-merge');
const getenv = require('../env/env');

module.exports = (options) => {
    return merge({
        devServer: {
            https: {
                ca: getenv('SSL_CA', '/usr/local/etc/httpd/ssl/ca.pem'),
                cert: getenv('SSL_CERT', '/usr/local/etc/httpd/ssl/server.crt'),
                key: getenv('SSL_KEY', '/usr/local/etc/httpd/ssl/server.key')
            },
            headers: {
                // Allow access from local pages, as they usually are not running on the same "domain"
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Headers': '*',
            },
            disableHostCheck: true,
        }
    }, { devServer: options.devServer })
};
