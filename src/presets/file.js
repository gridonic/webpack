module.exports = (options = {}) => ({
    module: {
        rules: [{
            test: options.test,

            // @see https://github.com/webpack-contrib/file-loader
            use: 'file-loader'
        }]
    }
});
