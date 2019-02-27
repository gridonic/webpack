// @see https://github.com/survivejs/webpack-merge
const merge = require('webpack-merge');

// @see https://github.com/developit/dlv
const delve = require('dlv');

let all = {};
let development = {};
let production = {};
let presets = [];

module.exports = {
    forAll(overwrites) {
        all = merge(all, overwrites);

        return this;
    },
    forDevelopment(overwrites) {
        development = merge(development, overwrites);

        return this;
    },
    forProduction(overwrites) {
        production = merge(production, overwrites);

        return this;
    },
    usePreset(...preset) {
        presets.push(preset);

        return this;
    },
    reset() {
        all = {};
        development = {};
        production = {};
        presets = [];

        return this;
    },
    toConfig: (options = {}) => {
        const mode = delve(options, 'mode', 'development');

        if (mode === 'production') {
            return require('../modes/production')(
                merge(all, production, { presets })
            );
        }

        return require('../modes/development')(
            merge(all, development, { presets })
        );
    }
};
