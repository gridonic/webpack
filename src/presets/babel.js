module.exports = (options = {}) => ({
    module: {
        rules: [{
            test: /\.m?js$/,
            exclude: /(node_modules|bower_components)/,
            use: [

                // @see https://github.com/babel/babel-loader
                'babel-loader'

            ]
        }]
    }
});
