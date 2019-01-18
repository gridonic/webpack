const merge = require('webpack-merge');

const development = require('./modes/development');
const production = require('./modes/production');
const plugins = require('./plugins');
const options = require('./options');

module.exports = {
    merge,
    development,
    production,
    plugins,
    options
};
