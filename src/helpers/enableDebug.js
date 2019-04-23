// @see https://github.com/lukeed/dset
const set = require('dset');

module.exports = ({ webpackConfig }) => {
    set(webpackConfig, 'stats', 'verbose');
    set(webpackConfig, 'devServer.noInfo', false);
    set(webpackConfig, 'devServer.quiet', false);
};
