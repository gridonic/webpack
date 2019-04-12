const merge = require('webpack-merge');

module.exports = (preset, defaults = {}, webpackOptions = {}) => {
    let fn;
    let options;

    if (Array.isArray(preset) === true) {
        [fn, options] = preset;
    } else if (typeof preset === 'string') {
        fn = preset;
    } else {
        throw new Error('Preset must be of type array or string.');
    }

    return require(`../presets/${fn}.js`)(merge(defaults, options), webpackOptions);
};
