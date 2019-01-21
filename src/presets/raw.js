const delve = require('dlv');

const defaults = {
    test: /\.txt$/
};

module.exports = (options = {}) => ({
    module: {
        rules: [{
            test: delve(options, 'test', defaults.test),

            // @see https://github.com/webpack-contrib/raw-loader
            use: 'raw-loader'
        }]
    }
});
