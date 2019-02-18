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

const description = 'Run development server';

// @see https://github.com/webpack/docs/wiki/webpack-dev-server
// @see https://github.com/webpack/webpack-dev-server/blob/master/examples/api/simple/server.js
const fn = (args = [], flags = {}) => {
    const config = delve(flags, 'config', defaults.config);
    const webpack = require('webpack');
    const WebpackDevServer = require('webpack-dev-server');

    let webpackConfig = importCwd.silent(config);

    // Quit because of configuration file not found
    if (webpackConfig === null) {
        return error(`${config} not found in current working directory.`);
    }

    // If webpack configuration is a function, pass flags along
    if (typeof webpackConfig === 'function') {
        webpackConfig = webpackConfig({
            ...flags,
            mode: 'development'
        });
    }

    // Dump configuration file
    if (delve(flags, 'dump', false) === true) {
        return dump.fn(webpackConfig, path.join(process.cwd(), config));
    }

    // Retrieve necessary options
    const { host, port, hot } = webpackConfig.devServer;

    // Try to use port given by configuration or next free one
    portfinder.getPort({ port }, (error, freePort) => {

        // Enable hot module replacement
        // @see https://github.com/webpack/docs/wiki/webpack-dev-server#hot-module-replacement-with-nodejs-api
        if (hot === true) {
            const hotEntries = [
                `webpack-dev-server/client?http://${host}:${freePort}/`,
                'webpack/hot/dev-server'
            ];

            if (typeof webpackConfig.entry === 'string') {
                webpackConfig.entry = [
                    ...hotEntries,
                    webpackConfig.entry
                ];
            } else {
                Object
                    .entries(webpackConfig.entry)
                    .forEach(([key, value]) => {
                        webpackConfig.entry[key] = [
                            ...hotEntries,
                            value
                        ];
                });
            }

            // @see https://webpack.js.org/plugins/hot-module-replacement-plugin/
            webpackConfig.plugins.push(new webpack.HotModuleReplacementPlugin());
        }

        const compiler = webpack(webpackConfig);
        const server = new WebpackDevServer(compiler, webpackConfig.devServer);
        const ip = address.ip();


        const isUnspecifiedHost = host === '0.0.0.0' || host === '::';
        const prettyHost = isUnspecifiedHost ? 'localhost' : host;

        info(chalk`Running in {bold development} mode…`);

        server.listen(freePort, host, () => {
            info(`Local:             http://${prettyHost}:${freePort}`);

            if (ip) {
                info(`On Your Network:   http://${ip}:${freePort}`)
            }
        });
    });
};

module.exports = {
    description,
    fn
};
