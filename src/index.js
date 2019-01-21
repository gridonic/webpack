const merge = require('webpack-merge');

const development = require('./modes/development');
const production = require('./modes/production');
const options = require('./options');
const plugins = require('./plugins');
const presets = require('./presets');

module.exports = {
    merge,
    development,
    production,
    options,
    plugins,
    presets
};
