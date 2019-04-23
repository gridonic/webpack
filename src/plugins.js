const clean = require('./plugins/clean');
const friendlyErrors = require('./plugins/friendlyErrors');
const html = require('./plugins/html');
const miniCssExtract = require('./plugins/miniCssExtract');
const styleLint = require('./plugins/styleLint');

module.exports = {
    clean,
    friendlyErrors,
    html,
    miniCssExtract,
    styleLint
};
