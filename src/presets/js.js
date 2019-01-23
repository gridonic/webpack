const delve = require('dlv');
const merge = require('webpack-merge');

const eslint = require('./eslint');

const defaults = {
    test: /\.js$/,
};

module.exports = (options = {}) => merge({
    module: {
        rules: [{
            test: delve(options, 'test', defaults.test),
            exclude: /node_modules/,

            // @see https://github.com/babel/babel-loader
            use: 'babel-loader'
        }]
    }
}, eslint(
    merge({
        mode: options.mode,
        test: delve(options, 'test', defaults.test)
    }, options.eslint)
));
