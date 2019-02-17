const commands = require('./commands');

module.exports = (command, args) => {
    const { fn } = commands.find(item => item.command === command);

    fn(args);
};
