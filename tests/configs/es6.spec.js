const es6 = require('../../src/configs/es6');

test('Add new option', () => {
    expect(es6.eslint({ test: 1337 }).test).toEqual(1337);
    expect(es6.babel({ test: 1337 }).test).toEqual(1337);
});

test('Overwrite existing option', () => {
    expect(es6.eslint({ plugins: false }).plugins).toEqual(false);
    expect(es6.babel({ plugins: false }).plugins).toEqual(false);
});

test('Extend existing option', () => {
    expect(es6.eslint({ plugins: [1337] }).plugins.pop()).toEqual(1337);
    expect(es6.babel({ plugins: [1337] }).plugins.pop()).toEqual(1337);
});
