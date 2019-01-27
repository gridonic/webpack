const delve = require('dlv');

const defaults = {
    test: /\.woff2?$/,
};

module.exports = (options = {}) => ({
    module: {
        rules: [{
            test: delve(options, 'test', defaults.test),

            // @see https://github.com/webpack-contrib/file-loader
            use: 'file-loader'
        }]
    }
});
