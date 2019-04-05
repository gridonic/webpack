const { extendConfig } = require('../../src');

test('Using Vue preset with custom file extension', () => {
    const customTest = 'customVue';

    const config = extendConfig
        .usePreset('vue', { test: customTest, noInstall: true })
        .toConfig();

    const vueRule = config.module.rules.find(rule => rule.test === customTest);

    expect(vueRule.test).toEqual(customTest);
    expect(config.output.publicPath).toEqual('/');
    expect(config.devServer.historyApiFallback).toEqual(true);
});

test('Using Vue preset with custom webpack options', () => {
    const customOutput = '/my-new-output/';

    const config = extendConfig
        .usePreset('vue', { noInstall: true })
        .forDevelopment({
            output: {
                publicPath: customOutput
            }
        })
        .toConfig();

    expect(config.output.publicPath).toEqual(customOutput);
});
