// @see https://github.com/chalk/chalk
const chalk = require('chalk');

const info = chalk.bgBlue.black(' INFO ');
const error = chalk.bgRed.black(' ERROR ');
const success = chalk.bgGreen.black(' SUCCESS ');
const warning = chalk.bgYellow.black(' WARNING ');

function log(message, newlineAfter = 0, newlineBefore = 0) {
    let result = '';

    if (newlineBefore) {
        result += '\n'.repeat(newlineBefore);
    }

    result += `${this} ${message}`;

    if (newlineAfter) {
        result += '\n'.repeat(newlineAfter);
    }

    console.log(result);
}

module.exports = {
    info: log.bind(info),
    error: log.bind(error),
    success: log.bind(success),
    warning: log.bind(warning)
};
