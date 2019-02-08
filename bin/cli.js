#!/usr/bin/env node

const meow = require('meow');
const shell = require('shelljs');
const chalk = require('chalk');

const logo = require('./logo');
const pkg = require('../package.json');

const cli = meow(`
${logo}
${chalk.bold.blue(pkg.name)} ${chalk.gray(`(v${pkg.version})`)}
	

	Usage
	  $ gridonic-webpack

	Options
	  --production, -p  Run in production mode
`, {
    description: false,
    flags: {
        production: {
            type: 'boolean',
            alias: 'p',
            default: false
        }
    }
});

const { production } = cli.flags;

console.log(`
${logo}
${chalk.bold.blue(pkg.name)} ${chalk.gray(`(v${pkg.version})`)}

Running in ${chalk.green(production === true ? 'production' : 'development')} mode…
`);

// Run in production mode
if (production === true) {
    return shell.exec('webpack --env production');
}

// Run in development mode…
shell.exec('webpack-dev-server --hot --inline');
