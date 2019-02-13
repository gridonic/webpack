const extendConfig = require('../../src/helpers/extendConfig');
const configureDevelopment = require('../../src/modes/development');
const configureProduction = require('../../src/modes/production');

const DEVELOPMENT = 'development';
const PRODUCTION = 'production';

describe('toConfig used from extendConfig', () => {
    it('should return default development config when nothing passed', () => {
        expect(toString((extendConfig().toConfig(DEVELOPMENT))))
            .toEqual(toString(configureDevelopment()));
    });

    it('should return default production config when nothing passed', () => {
        expect(toString(extendConfig().toConfig(PRODUCTION)))
            .toEqual(toString(configureProduction()));
    });

    it('should return general overrides for both environments', () => {
        const expectedEntryApp = 'myVeryOwnIndexFile.js';
        const extender = extendConfig(entryWithApp(expectedEntryApp));

        expect(extender.toConfig(DEVELOPMENT).entry.app)
            .toEqual(expectedEntryApp);

        expect(extender.toConfig(PRODUCTION).entry.app)
            .toEqual(expectedEntryApp);
    });

    it('should also return general overrides for both environments with forAll', () => {
        const expectedEntryApp = 'myVeryOwnIndexFile.js';

        const extender = extendConfig()
            .forAll(entryWithApp(expectedEntryApp));

        expect(extender.toConfig(DEVELOPMENT).entry.app)
            .toEqual(expectedEntryApp);

        expect(extender.toConfig(PRODUCTION).entry.app)
            .toEqual(expectedEntryApp);
    })

    it('should return development override in development but not in production config', () => {
        const defaultEntryApp = './src/index.js';
        const developmentEntryApp = 'myVeryOwnIndexFile.js';

        const extender = extendConfig()
            .forDevelopment(entryWithApp(developmentEntryApp));

        expect(extender.toConfig(DEVELOPMENT).entry.app)
            .toEqual(developmentEntryApp);

        expect(extender.toConfig(PRODUCTION).entry.app)
            .toEqual(defaultEntryApp);
    });

    it('should return production override in production but not in development config', () => {
        const defaultEntryApp = './src/index.js';
        const productionEntryApp = 'myVeryOwnIndexFile.js';

        const extender = extendConfig()
            .forProduction(entryWithApp(productionEntryApp));

        expect(extender.toConfig(DEVELOPMENT).entry.app)
            .toEqual(defaultEntryApp);

        expect(extender.toConfig(PRODUCTION).entry.app)
            .toEqual(productionEntryApp);
    });

    it('should return development override if env string is empty', () => {
        const expectedEntryApp = 'myVeryOwnIndexFile.js';
        const extender = extendConfig()
            .forDevelopment(entryWithApp(expectedEntryApp));

        expect(extender.toConfig('').entry.app)
            .toEqual(expectedEntryApp);
    });

    it('should contain general, development and production overrides in the suitable configs', () => {
        const expectedOutputPath = '/a/new/output/path';
        const developmentEntryApp = 'devIndexFile.js';
        const productionEntryApp = 'prodIndexFile.js';

        const extender = extendConfig({
            output: {
                path: expectedOutputPath
            }
        })
            .forDevelopment(entryWithApp(developmentEntryApp))
            .forProduction(entryWithApp(productionEntryApp));

        const developmentConfig = extender.toConfig(DEVELOPMENT);
        expect(developmentConfig.entry.app).toEqual(developmentEntryApp);
        expect(developmentConfig.output.path).toEqual(expectedOutputPath);

        const productionConfig = extender.toConfig(PRODUCTION);
        expect(productionConfig.entry.app).toEqual(productionEntryApp);
        expect(productionConfig.output.path).toEqual(expectedOutputPath);
    });

    it('should return a function that returns the config with toConfigurator', () => {
        const defaultEntryApp = './src/index.js';
        const developmentEntryApp = 'myVeryOwnIndexFile.js';

        const extender = extendConfig()
            .forDevelopment(entryWithApp(developmentEntryApp));

        expect(extender.toConfigurator()(DEVELOPMENT).entry.app)
            .toEqual(developmentEntryApp);

        expect(extender.toConfigurator()(PRODUCTION).entry.app)
            .toEqual(defaultEntryApp);
    });

    function entryWithApp(expectedEntryApp) {
        return {
            entry: {
                app: expectedEntryApp
            }
        };
    }

    // Did not find a way how to make the resulting configs to work with "toEqual", so we have to stringify them
    function toString(config) {
        return JSON.stringify(config);
    }
});
