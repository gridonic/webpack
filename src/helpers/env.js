const fs = require('fs');
const path = require('path');

// @see https://github.com/developit/dlv
const delve = require('dlv');

module.exports = (name, defaultValue) => {
    if (fs.existsSync(path.resolve(process.cwd(), '.env')) === false) {
        return defaultValue;
    }

    // Reads the variables from .env files using dotenv.config() so they can be
    // accessed by process.env.
    //
    // @see https://github.com/motdotla/dotenv
    const result = require('dotenv').config();

    if (result.error) {
        throw result.error;
    }

    return delve(process, `env.${name}`, defaultValue);
};
