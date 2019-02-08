const vue = require('../../src/configs/vue');

test('Add new option', () => {
    expect(vue.eslint({ test: 1337 }).test).toEqual(1337);
    expect(vue.babel({ test: 1337 }).test).toEqual(1337);
});

test('Overwrite existing option', () => {
    expect(vue.eslint({ plugins: false }).plugins).toEqual(false);
    expect(vue.babel({ plugins: false }).plugins).toEqual(false);
});

test('Extend existing option', () => {
    expect(vue.eslint({ plugins: [1337] }).plugins.pop()).toEqual(1337);
    expect(vue.babel({ plugins: [1337] }).plugins.pop()).toEqual(1337);
});
