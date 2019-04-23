const process = require('process');
const path = require('path');

// @see https://github.com/developit/dlv
const delve = require('dlv');

// @see https://github.com/sindresorhus/import-cwd
const importCwd = require('import-cwd');

// @see https://github.com/chalk/chalk
const chalk = require('chalk');

// @see https://github.com/node-modules/address
const address = require('address');

// @see https://github.com/indexzero/node-portfinder
const portfinder = require('portfinder');

// @see https://github.com/gridonic/log
const { info, error } = require('@gridonic/log');

const defaults = require('../defaults');
const dump = require('../flags/dump');
const setIfUnknown = require('../../helpers/setIfUnknown');
const enableHmr = require('../../helpers/enableHmr');
const enableDebug = require('../../helpers/enableDebug');

const description = 'Run development server';

// @see https://github.com/webpack/docs/wiki/webpack-dev-server
// @see https://github.com/webpack/webpack-dev-server/blob/master/examples/api/simple/server.js
const fn = (args = [], flags = {}) => {
    const config = delve(flags, 'config', defaults.config);
    const webpack = require('webpack');
    const WebpackDevServer = require('webpack-dev-server');

    let webpackConfig = importCwd(config);

    // If webpack configuration is a function, pass flags along. This way use
    // can implement custom behaviour based on CLI flags.
    if (typeof webpackConfig === 'function') {
        webpackConfig = webpackConfig({
            ...flags,
            mode: 'development'
        });
    }

    // Retrieve necessary options
    const { host, port, hot, https } = (webpackConfig.devServer || {});

    let protocol = 'http';

    if (https) {
        protocol = 'https';
    }

    // Try to use port given by configuration or next free one
    portfinder.getPort({ port }, (portError, freePort) => {
        webpackConfig.devServer.port = freePort;

        // Some presets can set the publicPath to null,
        // in order to get the value set dynamically
        setIfUnknown(webpackConfig, 'output.publicPath', `${protocol}://${host}:${freePort}/`);

        // Enable hot module replacement
        // @see https://github.com/webpack/docs/wiki/webpack-dev-server#hot-module-replacement-with-nodejs-api
        if (hot === true) {
            enableHmr({
                protocol,
                host,
                port: freePort,
                webpackConfig
            });
        }

        // Replace old port in output.publicPath with new free one…
        webpackConfig.output.publicPath = webpackConfig
            .output
            .publicPath
            .replace(port, freePort);

        // Debug flag is enabled. Make everything verbose.
        if (delve(flags, 'debug', false) === true) {
            enableDebug({ webpackConfig });
        }

        // Dump flag is enabled. Time to dump configuration file and leave.
        if (delve(flags, 'dump', false) === true) {
            return dump.fn(webpackConfig, path.join(process.cwd(), config));
        }

        // During free port scan, an error occured.
        if (portError) {
            return error(portError);
        }

        const compiler = webpack(webpackConfig);
        const server = new WebpackDevServer(compiler, webpackConfig.devServer);
        const ip = address.ip();


        const isUnspecifiedHost = host === '0.0.0.0' || host === '::';
        const prettyHost = isUnspecifiedHost ? 'localhost' : host;

        info(chalk`Running in {bold development} mode…`);

        server.listen(freePort, host, () => {
            info(`Local:             ${protocol}://${prettyHost}:${freePort}`);

            if (ip) {
                info(`On Your Network:   ${protocol}://${ip}:${freePort}`)
            }
        });
    });
};

module.exports = {
    description,
    fn
};
