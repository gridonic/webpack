const entry = require('../entry');
const output = require('../output');

module.exports = {

    // @see https://webpack.js.org/concepts/mode/
    mode: 'development',

    entry,

    // @see https://webpack.js.org/configuration/devtool/
    devtool: 'inline-source-map',

    // @see https://webpack.js.org/configuration/output/
    output: Object.assign({}, output, {
        filename: '[name].js'
    })
};
