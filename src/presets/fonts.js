const delve = require('dlv');

const defaults = {

    // We are only serving woff and woff2 font files since they are just
    // superior to legacy formats (ttf, otf, eot) and the support for these
    // formats is pretty decent by now.
    //
    // @see https://caniuse.com/#search=woff
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
