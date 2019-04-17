const setIfUnknown = require('../../src/helpers/setIfUnknown');

test('Should not update value if key exists', () => {
    const value = '/my/custom/path';
    const webpackConfig = {
        a: value,
        b: null,
        c: undefined
    };

    setIfUnknown(webpackConfig, 'a', 'random');
    setIfUnknown(webpackConfig, 'b', value);
    setIfUnknown(webpackConfig, 'c', value);
    setIfUnknown(webpackConfig, 'd', value);

    expect(webpackConfig.a).toBe(value);
    expect(webpackConfig.b).toBe(value);
    expect(webpackConfig.c).toBe(value);
    expect(webpackConfig.d).toBe(value);
});
