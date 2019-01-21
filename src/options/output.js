const path = require('path');
const delve = require('dlv');

const context = require('./context');

const defaults = {
    path: path.join(context(), 'public'),
    filename: '[name].js'
};

// @see https://webpack.js.org/configuration/output/
module.exports = (options = {}) => ({

    // @see https://webpack.js.org/configuration/output/#output-path
    path: delve(options, 'path', defaults.path),

    // @see https://webpack.js.org/configuration/output/#output-filename
    filename: delve(options, 'filename', defaults.filename)

});
