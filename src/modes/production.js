const entry = require('../entry');
const output = require('../output');

// @see https://webpack.js.org/guides/production/
module.exports = {

    // @see https://webpack.js.org/concepts/mode/
    mode: 'production',

    entry,

    // @see https://webpack.js.org/configuration/devtool/
    // @see https://webpack.js.org/guides/production/#source-mapping
    devtool: 'source-map',

    // @see https://webpack.js.org/configuration/output/
    output: Object.assign({}, output, {
        filename: '[name].[hash].js'
    })
};
