const postcss = require('../../src/configs/postcss');

test('Add new option', () => {
    expect(postcss({ test: 1337 }).test).toEqual(1337);
});

test('Overwrite existing option', () => {
    expect(postcss({ plugins: false }).plugins).toEqual(false);
});

test('Extend existing option', () => {
    expect(postcss({ plugins: [1337] }).plugins.pop()).toEqual(1337);
});
