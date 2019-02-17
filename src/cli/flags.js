const fs = require('fs');
const path = require('path');

const pathToFlags = path.join(__dirname, 'flags');
const flags = {};

// Return a list of flags based on existing files in flags directory
const files = fs.readdirSync(pathToFlags);

files.forEach((file) => {
    const name = file.slice(0, -3);
    const flag = require(path.join(pathToFlags, file));

    flags[name] = flag;
});

module.exports = flags;
