const process = require('process');
const path = require('path');

// @see https://github.com/developit/dlv
const delve = require('dlv');

// @see https://github.com/sindresorhus/import-cwd
const importCwd = require('import-cwd');

// @see https://github.com/chalk/chalk
const chalk = require('chalk');

// @see https://github.com/shellscape/webpack-log
const log = (new require('webpack-log'))({ name: 'build' });

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

    log.info(chalk`Running in {bold production} mode…`);

    // @see https://webpack.js.org/api/node/
    const compiler = webpack(webpackConfig, (error, stats) => {
        if (stats.hasErrors() === false && (error === undefined || error === null)) {
            log.info(stats.toString(webpackConfig.stats));
            log.info('Build complete.');

            return;
        }

        process.exitCode = 1;

        // Fatal webpack errors (wrong configuration, etc)
        if (error) {
            log.error(error.stack || error);

            if (error.details) {
                log.error(error.details)
            }

            return;
        }

        // Compilation errors (missing modules, syntax errors, etc)
        if (stats.hasErrors()) {
            log.error(stats.toString(webpackConfig.stats));
        }

        // Compilation warnings
        if (stats.hasWarnings()) {
            log.warn(stats.toString(webpackConfig.stats));
        }

        log.info('Build incomplete.');
    });
};

module.exports = {
    description,
    fn
};
