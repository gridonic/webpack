// @see https://github.com/developit/dlv
const delve = require('dlv');

// @see https://eslint.org/docs/developer-guide/nodejs-api#cliengine
const defaults = {
    test: /\.js$/,
    exclude: /node_modules/,
    fix: false
};

module.exports = (options = {}) => ({
    module: {
        rules: [{
            test: delve(options, 'test', defaults.test),
            exclude: delve(options, 'exclude', defaults.exclude),
            enforce: 'pre',

            // @see https://github.com/webpack-contrib/eslint-loader
            use: [{
                loader: 'eslint-loader',
                options: {
                    fix: delve(options, 'fix', defaults.fix),
                    emitWarning: delve(options, 'emitWarning', options.mode !== 'production'),
                    failOnError: delve(options, 'failOnError', options.mode === 'production')
                }
            }]
        }]
    }
});
