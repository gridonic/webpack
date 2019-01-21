const css = require('./css');

module.exports = (options = {}) => {

    // We are going to use the CSS preset and adjust it
    const result = css(options);

    result.module.rules[0].test = /\.s[ac]ss$/;

    // Since we are going to use the sass-loader
    // we need to adjust the importLoaders configuration
    //
    // @see https://github.com/webpack-contrib/css-loader#importloaders
    result.module.rules[0].use[1].options.importLoaders = 2;

    // @see https://github.com/webpack-contrib/sass-loader
    result.module.rules[0].use.push('sass-loader');

    return result;
};
