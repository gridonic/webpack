const merge = require('webpack-merge');

const cli = require('./cli');
const development = require('./modes/development');
const extendConfig = require('./helpers/extendConfig');
const options = require('./options');
const plugins = require('./plugins');
const presets = require('./presets');
const production = require('./modes/production');

module.exports = {
    cli,
    development,
    extendConfig,
    merge,
    options,
    plugins,
    presets,
    production,
};
