const merge = require('webpack-merge');

module.exports = (preset, defaults = {}) => {
    if (Array.isArray(preset) === true) {
        const [fn, options] = preset;

        return fn(merge(defaults, options));
    }

    if (typeof preset === 'function') {
        return preset(defaults);
    }

    if (typeof preset === 'string') {
        return require(`../presets/${preset}.js`)(defaults);
    }

    throw new Error('Preset must be of type array, function or string.');
};
