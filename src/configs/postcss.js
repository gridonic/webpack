const delve = require('dlv');
const merge = require('webpack-merge');

const defaults = {
    autoprefixer: {},
    replace: {},
    cssnano: {}
};

// @see https://github.com/postcss/postcss/tree/master/docs
module.exports = (options = {}) => {
    const result = {
        plugins: [
            require('autoprefixer')(delve(options, 'autoprefixer', defaults.autoprefixer)),
            require('postcss-replace')(delve(options, 'replace', defaults.replace)),
        ]
    };

    if (options.mode === 'production') {
        result.plugins.push(
            require('cssnano')(delve(options, 'cssnano', defaults.cssnano))
        );
    }

    return merge(result, options);
};
