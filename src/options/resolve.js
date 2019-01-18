const path = require('path');
const process = require('process');

// @see https://webpack.js.org/configuration/resolve/
module.exports = {

    // @see https://webpack.js.org/configuration/resolve/#resolve-alias
    alias: {
        '@': path.join(process.cwd(), 'src')
    }
};
