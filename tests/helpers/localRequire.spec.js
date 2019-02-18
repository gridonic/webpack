const localRequire = require('../../src/helpers/localRequire');

// In test mode we do not modify any package.json’s
const options = {
    dry: true
};

// Mock a package.json
const mockPkg = {
    pkg: {
        dependencies: {
            vue: '^2.5'
        }
    }
};

test('No missing dependency', async () => {
    const missingOnes = {
        vue: '^2.5'
    };

    expect(await localRequire(missingOnes, Object.assign({}, options, mockPkg)))
        .toEqual({});
});

test('One missing dependency', async () => {
    const missingOnes = {
        vue: '^2.5',
        vuex: '^3.1'
    };

    expect(await localRequire(missingOnes, Object.assign({}, options, mockPkg)))
        .toEqual({
            vuex: '^3.1'
        });
});

test('All dependencies missing', async () => {
    const missingOnes = {
        angular: '^7',
        vuex: '^3.1'
    };

    expect(await localRequire(missingOnes, Object.assign({}, options, mockPkg)))
        .toEqual(missingOnes);
});

test('One missing dependency in this repository', async () => {
    const missingOnes = {
        vuex: '^3.1'
    };

    expect(await localRequire(missingOnes, options))
        .toEqual(missingOnes);
});

// Pick a dependency that is defined in the package.json of @gridonic/webpack (in here)
test('No missing dependency in this repository', async () => {
    expect(await localRequire({ '@gridonic/log': '^1.0.0' }, options))
        .toEqual({});
});
