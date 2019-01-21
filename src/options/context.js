const process = require('process');

// @see https://webpack.js.org/configuration/entry-context/#context
module.exports = (context = process.cwd()) => context;
