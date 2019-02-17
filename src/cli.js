const { name, description, version } = require('../package.json');
const commands = require('./cli/commands');
const flags = require('./cli/flags');
const run = require('./cli/run');

module.exports = {
    name,
    description,
    version,
    run,
    flags,
    commands,
};
