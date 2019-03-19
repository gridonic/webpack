// Reads the variables from .env files using dotenv.config() so they can be accessed by process.env
// @see https://www.npmjs.com/package/dotenv
require('dotenv').config();

module.exports = (name, defaultValue) => {
    return process.env[name] || defaultValue;
};
