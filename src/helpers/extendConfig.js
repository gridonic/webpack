const merge = require('webpack-merge');
const configureDevelopment = require('../modes/development');
const configureProduction = require('../modes/production');

const DEVELOPMENT = 'development';
const PRODUCTION = 'production';

const extendConfig = (extendedConfig) => {
    return new ConfigExtender(extendedConfig);
};

class ConfigExtender {
    constructor(extendedConfig) {
        this.overrides = {
            default: extendedConfig
        };
    }

    forDevelopment(extendedConfig) {
        this.overrides.development = extendedConfig;

        return this;
    }

    forProduction(extendedConfig) {
        this.overrides.production = extendedConfig;

        return this;
    }

    toConfig(env) {
        const sanitizedEnv = this.sanitizedEnv(env);

        if (sanitizedEnv === PRODUCTION) {
            return this.configureWithMode(sanitizedEnv, configureProduction);
        }

        return this.configureWithMode(sanitizedEnv, configureDevelopment);
    }

    toConfigurator() {
        return (env) => this.toConfig(env);
    }

    configureWithMode(env, configurator) {
        const config = configurator(this.overrides.default);

        return merge(config, this.overrides[env] || {});
    }

    sanitizedEnv(env) {
        if (!env) {
            return DEVELOPMENT;
        }

        return env;
    }
}

module.exports = {
    extendConfig
};
