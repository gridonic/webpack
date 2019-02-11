#!/usr/bin/env node

// @see https://github.com/sindresorhus/meow
const meow = require('meow');

// @see https://github.com/shelljs/shelljs
const shell = require('shelljs');

// @see https://github.com/chalk/chalk
const chalk = require('chalk');

// @see https://github.com/sindresorhus/import-cwd
const importCwd = require('import-cwd');

// @see https://github.com/Javascipt/Jsome
const jsome = require('jsome');

// Gridonic branding
const brand = require('./brand');

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
console.log(brand);

// Just dump the configuration and leave
if (dump === true) {
    return jsome(
        importCwd('./webpack.config.js')(env)
    );
}

console.log(`
Running in ${chalk.green(env)} mode…
`);

// Run in production mode
if (production === true) {
    return shell.exec('webpack --env production');
}

// Run in development mode…
shell.exec('webpack-dev-server --hot --inline');
