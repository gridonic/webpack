const delve = require('dlv');

// @see https://eslint.org/docs/developer-guide/nodejs-api#cliengine
const defaults = {
    fix: true
};

module.exports = (options = {}) => ({
    module: {
        rules: [{
            test: delve(options, 'test'),
            exclude: /node_modules/,
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
