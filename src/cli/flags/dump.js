// @see https://github.com/chalk/chalk
const chalk = require('chalk');

// @see https://github.com/sapegin/q-i
const qi  = require('q-i');

// @see https://github.com/gridonic/log
const { info, success } = require('@gridonic/log');

const alias = 'd';
const type = 'boolean';
const description = 'Dumps the configuration';

const fn = (webpackConfig, pathToConfig) => {
    info(chalk`Dumping {green ${pathToConfig}}…`, 1);

    qi.print(webpackConfig);

    success('Finished.', 0, 1);
};

module.exports = {
    alias,
    description,
    type,
    fn
};
