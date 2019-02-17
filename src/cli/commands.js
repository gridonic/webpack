const fs = require('fs');
const path = require('path');

const pathToCommands = path.join(__dirname, 'commands');
const commands = {};

// Return a list of commands based on existing files in commands directory
const files = fs.readdirSync(pathToCommands);

files.forEach((file) => {
    const name = file.slice(0, -3);
    const command = require(path.join(pathToCommands, file));

    commands[name] = command;
});

module.exports = commands;
