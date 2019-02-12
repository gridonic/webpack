const merge = require('webpack-merge');

const development = require('./modes/development');
const production = require('./modes/production');
const extendConfig = require('./helpers/extendConfig');
const configs = require('./configs');
const options = require('./options');
const plugins = require('./plugins');
const presets = require('./presets');

module.exports = {
    merge,
    development,
    production,
    extendConfig,
    configs,
    options,
    plugins,
    presets
};
