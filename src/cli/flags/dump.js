// @see https://github.com/chalk/chalk
const chalk = require('chalk');

// @see https://github.com/sapegin/q-i
const qi  = require('q-i');

// @see https://github.com/shellscape/webpack-log
const log = (new require('webpack-log'))({ name: 'build' });

const alias = 'd';
const type = 'boolean';
const description = 'Dumps the configuration';

const fn = (webpackConfig, pathToConfig) => {
    log.info(chalk`Dumping {green ${pathToConfig}}…`);

    qi.print(webpackConfig);

    log.info('Finished.');
};

module.exports = {
    alias,
    description,
    type,
    fn
};
