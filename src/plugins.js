const clean = require('./plugins/clean');
const errorOverlay = require('./plugins/errorOverlay');
const friendlyErrors = require('./plugins/friendlyErrors');
const hmr = require('./plugins/hmr');
const html = require('./plugins/html');
const miniCssExtract = require('./plugins/miniCssExtract');

module.exports = {
    clean,
    errorOverlay,
    friendlyErrors,
    hmr,
    html,
    miniCssExtract
};
