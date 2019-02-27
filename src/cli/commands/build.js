const process = require('process');
const path = require('path');

// @see https://github.com/developit/dlv
const delve = require('dlv');

// @see https://github.com/sindresorhus/import-cwd
const importCwd = require('import-cwd');

// @see https://github.com/gridonic/log
const { error } = require('@gridonic/log');

const defaults = require('../defaults');
const dump = require('../flags/dump');

const description = 'Create production build';

const fn = (args = [], flags = {}) => {
    const config = delve(flags, 'config', defaults.config);
    const webpack = require('webpack');

    let webpackConfig = importCwd(config);

    // If webpack configuration is a function, pass flags along
    if (typeof webpackConfig === 'function') {
        webpackConfig = webpackConfig({
            ...flags,
            mode: 'production'
        });
    }

    // Dump configuration file
    if (delve(flags, 'dump', false) === true) {
        return dump.fn(webpackConfig, path.join(process.cwd(), config));
    }

    try {
        webpack(webpackConfig).run((e, stats) => {
            if (e) {
                return error(e);
            }

            console.log(
                stats.toString(webpackConfig.stats)
            );
        });
    } catch (e) {
        error(e);
    }
};

module.exports = {
    description,
    fn
};
