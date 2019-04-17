// @see https://github.com/developit/dlv
const get = require('dlv');

// @see https://github.com/lukeed/dset
const set = require('dset');

module.exports = (webpackOptions, key, value) => {
    if (get(webpackOptions, key, null) === null) {
        set(webpackOptions, key, value);
    }
};
