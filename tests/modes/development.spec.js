const development = require('../../src/modes/development');

test('Pass webpack options to preset', () => {
    const test = /\.vue$/;
    const customValue = 'test';
    const config = development({
        eslint: {
            fix: customValue
        },
        presets: [
            ['vue', {
                noInstall: true
            }]
        ]
    });

    const rule = config.module.rules.find(
        rule =>
            rule.test &&
            rule.test.toString() === test.toString() &&
            rule.enforce === 'pre'
    );

    expect(rule.use[0].options.fix).toBe(customValue);
});
