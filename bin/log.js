// @see https://github.com/chalk/chalk
const chalk = require('chalk');

const defaults = {
    newline: [0, 0],
    bgColor: '',
    label: ''
};

function log(message, options = {}) {
    const {
        newline,
        bgColor,
        label
    } = Object.assign({}, defaults, this, options);

    let [before, after] = newline;
    let result = '';

    if (before) {
        result += '\n'.repeat(before);
    }

    if (bgColor && label) {
        result += chalk`{${bgColor}.white  ${label.toUpperCase()} } `;
    }

    result += message;

    if (after) {
        result += '\n'.repeat(after);
    }

    console.log(result);
}

module.exports = {
    log,
    info: log.bind({ label: 'info', bgColor: 'bgBlue' }),
    error: log.bind({ label: 'error', bgColor: 'bgRed' }),
    success: log.bind({ label: 'success', bgColor: 'bgGreen' }),
    warning: log.bind({ label: 'warning', bgColor: 'bgYellow' })
};
