const entry = require('../entry');
const output = require('../output');

// @see https://webpack.js.org/guides/development/
module.exports = {

    // @see https://webpack.js.org/concepts/mode/
    mode: 'development',

    entry,

    // @see https://webpack.js.org/configuration/devtool/
    devtool: 'inline-source-map',

    // @see https://webpack.js.org/configuration/dev-server/
    devServer: {

        // @see https://webpack.js.org/configuration/dev-server/#devserver-contentbase
        contentBase: output.path
    },

    // @see https://webpack.js.org/configuration/output/
    output: Object.assign({}, output, {
        filename: '[name].js'
    })
};
