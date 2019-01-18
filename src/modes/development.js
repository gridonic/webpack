const entry = require('../entry');
const output = require('../output');
const hmr = require('../hmr');

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
        contentBase: output.path,

        // @see https://webpack.js.org/configuration/dev-server/#devserver-hot
        // @see https://webpack.js.org/concepts/hot-module-replacement/
        // @see https://webpack.js.org/guides/hot-module-replacement/
        hot: true
    },

    // @see https://webpack.js.org/configuration/plugins/
    plugins: [
        hmr()
    ],

    // @see https://webpack.js.org/configuration/output/
    output: Object.assign({}, output, {
        filename: '[name].js'
    })
};
