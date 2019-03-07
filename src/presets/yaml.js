const delve = require('dlv');

const defaults = {
    test: /\.ya?ml$/,
    extensions: ['.yaml', '.yml']
};

module.exports = (options = {}) => ({
    resolve: {
        extensions: delve(options, 'extensions', defaults.extensions)
    },
    module: {
        rules: [{
            test: delve(options, 'test', defaults.test),
            type: 'json',

            // @see https://github.com/okonet/yaml-loader
            use: 'yaml-loader'
        }]
    }
});
