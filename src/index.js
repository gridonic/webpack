const merge = require('webpack-merge');

const development = require('./modes/development');
const production = require('./modes/production');

module.exports = {
    merge,
    development,
    production
};
