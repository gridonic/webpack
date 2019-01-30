module.exports = (options = {}) => ({
    module: {
        rules: [{
            test: options.test,

            // @see https://github.com/webpack-contrib/raw-loader
            use: 'raw-loader'
        }]
    }
});
