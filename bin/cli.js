#!/usr/bin/env node

const path = require('path');
const process = require('process');

// @see https://github.com/sindresorhus/meow
const meow = require('meow');

// @see https://github.com/shelljs/shelljs
const shell = require('shelljs');

// @see https://github.com/chalk/chalk
const chalk = require('chalk');

// @see https://github.com/sindresorhus/import-cwd
const importCwd = require('import-cwd');

// @see https://github.com/sapegin/q-i
const qi  = require('q-i');

const brand = require('./brand');
const { log, info } = require('./log');

const cli = meow(chalk`
${brand}
	{blue Usage}
	  {gray $} gridonic-webpack

	{blue Options}
	  --production, -p      {gray Run in production mode}
	  --dump, -d            {gray Dumps the configuration} 
`, {
    description: false,
    flags: {
        production: {
            type: 'boolean',
            alias: 'p',
            default: false
        },
        dump: {
            type: 'boolean',
            alias: 'd',
            default: false
        }
    }
});

const { production, dump } = cli.flags;
const env = production === true ? 'production' : 'development';

// Print logo and version
log(brand);

// Just dump the configuration and leave
if (dump === true) {
    const configFile = './webpack.config.js';
    const configPath = path.join(process.cwd(), configFile);

    info(chalk`Dumping {green ${configPath}}…`, { newline: [0, 2] });

    return qi.print(importCwd(configFile)(env));
}

// Tell which environment we are running on
info(chalk`Running in {green ${env}} mode…`, { newline: [0, 2] });

// Run in production mode
if (production === true) {
    return shell.exec('webpack --env production');
}

// Run in development mode…
shell.exec('webpack-dev-server --hot --inline --env development');
