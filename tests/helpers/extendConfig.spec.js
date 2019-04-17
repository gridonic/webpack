const extendConfig = require('../../src/helpers/extendConfig');
const production = 'production';
const development = 'development';

test('Should return function', () => {
    expect(typeof extendConfig.toConfig === 'function').toBe(true);
});

test('Should return production configuration', () => {
    expect(extendConfig.toConfig({ mode: production }).mode).toBe(production);
});

test('Should return development configuration', () => {
    expect(extendConfig.toConfig({ mode: development }).mode).toBe(development);
});

test('Changing settings for all should apply to all', () => {
    const entry = 'test.js';
    const config = extendConfig
        .forAll({ entry })
        .toConfig;

    expect(config({ mode: production }).entry).toBe(entry);
    expect(config({ mode: development }).entry).toBe(entry);
});

test('Changing settings for one mode should apply only for that mode', () => {
    const entry = 'test.js';
    const config = extendConfig
        .reset()
        .forProduction({ entry })
        .toConfig;

    expect(config({ mode: production }).entry).toBe(entry);
    expect(config({ mode: development }).entry).not.toBe(entry);
});

test('Applying a preset should work', () => {
    const preset = {
        name: 'raw',
        options: { test: 'raw-test' }
    };

    const config = extendConfig
        .reset()
        .usePreset(preset.name, preset.options)
        .toConfig;

    expect(
        config({ mode: development })
            .module
            .rules
            .find(({ test }) => test === preset.options.test)
    ).not.toBe(undefined);
});


test('Overriding settings of a preset', () => {
    const customValue = 'custom';
    const config = extendConfig
        .reset()
        .usePreset('vue', {
            noInstall: true
        })
        .forDevelopment({
            html: {
                template: customValue
            }
        })
        .toConfig;

    expect(
        config({ mode: development })
            .plugins
            .find(plugin => plugin.constructor.name === 'HtmlWebpackPlugin')
            .options
            .template
    ).toBe(customValue);
});



test('Preset should override defaults', () => {
    const config = extendConfig
        .reset()
        .usePreset('vue', {
            noInstall: true
        })
        .toConfig;

    expect(
        config({ mode: development })
            .plugins
            .find(plugin => plugin.constructor.name === 'HtmlWebpackPlugin')
            .options
            .template
            .indexOf('default_index.ejs') >= 0
    ).toBe(false);
});
