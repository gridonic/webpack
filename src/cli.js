const { name, description, version } = require('../package.json');
const commands = require('./cli/commands');
const flags = require('./cli/flags');

module.exports = {
    name,
    description,
    version,
    flags,
    commands,
};
