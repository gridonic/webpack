// @see https://github.com/developit/dlv
const delve = require('dlv');

// Reads the variables from .env files using dotenv.config() so they can be
// accessed by process.env.
//
// @see https://github.com/motdotla/dotenv
const result = require('dotenv').config();

if (result.error) {
    throw result.error;
}

module.exports = (name, defaultValue) => {
    return delve(process, `env.${name}`, defaultValue);
};
