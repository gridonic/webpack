const path = require('path');
const process = require('process');

// @see https://webpack.js.org/configuration/output/
module.exports = {
    path: path.join(process.cwd(), 'public'),
};
