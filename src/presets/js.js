const delve = require('dlv');
const merge = require('webpack-merge');

const eslint = require('./eslint');

const defaults = {
    test: /\.js$/,
    exclude: /node_modules/,
    babel: {
        cacheDirectory: true
    }
};

module.exports = (options = {}) => merge({
    module: {
        rules: [{
            test: delve(options, 'test', defaults.test),
            exclude: delve(options, 'exclude', defaults.exclude),

            // @see https://github.com/babel/babel-loader
            use: {
                loader: 'babel-loader',
                options: merge(defaults.babel, delve(options, 'babel'))
            }
        }]
    }
}, eslint(
    merge({
        mode: options.mode,
        test: delve(options, 'test', defaults.test)
    }, options.eslint)
));
