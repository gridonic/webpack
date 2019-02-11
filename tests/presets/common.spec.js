const common = require('../../src/presets/common');

test('Override default options', () => {
    const entry = 'unknown.js';
    const config = common({
        entry
    });

    expect(config.entry).toEqual(entry);
});

test('Apply options that are not preconfigured', () => {
    const name = 'test';
    const config = common({
        name
    });

    expect(config.name).toBe(name);
});
