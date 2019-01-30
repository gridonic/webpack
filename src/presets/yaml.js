const delve = require('dlv');

const defaults = {
    test: /\.ya?ml$/
};

module.exports = (options = {}) => ({
    module: {
        rules: [{
            test: delve(options, test, defaults.test),

            // @see https://github.com/okonet/yaml-loader
            use: 'yaml-loader'
        }]
    }
});
