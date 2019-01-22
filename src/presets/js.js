const delve = require('dlv');

module.exports = (options = {}) => {
    const result = {
        module: {
            rules: [{
                test: /\.m?js$/,
                exclude: /node_modules/,

                // @see https://github.com/babel/babel-loader
                use: ['babel-loader']
            }]
        }
    };

    // Enable linting in production
    if (delve(options, 'mode') === 'production') {
        result.module.rules[0].use.push({
            loader: 'eslint-loader',

            // @see https://eslint.org/docs/developer-guide/nodejs-api#cliengine
            options: {
                fix: delve(options, 'eslint.fix', defaults.eslint.fix)
            }
        });
    }

    return result;
};
