const clean = require('./plugins/clean');
const friendlyErrors = require('./plugins/friendlyErrors');
const hmr = require('./plugins/hmr');
const html = require('./plugins/html');
const miniCssExtract = require('./plugins/miniCssExtract');
const writeFile = require('./plugins/writeFile');

module.exports = {
    clean,
    friendlyErrors,
    hmr,
    html,
    miniCssExtract,
    writeFile
};
