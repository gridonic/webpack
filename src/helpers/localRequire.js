// @see https://github.com/developit/dlv
const delve = require('dlv');

// @see https://github.com/sindresorhus/read-pkg
const readPkg = require('read-pkg');

// @see https://github.com/sindresorhus/write-pkg
const writePkg = require('write-pkg');

// @see https://github.com/survivejs/webpack-merge
const merge = require('webpack-merge');

// @see https://github.com/shelljs/shelljs
const shell = require('shelljs');

// @see https://github.com/shellscape/webpack-log
const log = (new require('webpack-log'))({ name: 'build' });

module.exports = (dependencies, options = {}) => {
    const key = delve(options, 'dev', false) === true ? 'devDependencies' : 'dependencies';
    const pkg = delve(options, 'pkg', readPkg.sync({ normalize: false }));
    const missingOnes = {};

    // Get list of packages that are not within the package.json
    // @todo Check node_modules as well
    Object.keys(dependencies).forEach((name) => {
        const isMissing = delve(pkg, `${key}.${name}`, false) === false;

        if (isMissing === false) {
            return;
        }

        missingOnes[name] = dependencies[name];
    });

    // Dry run, only return list of missing dependencies
    if (delve(options, 'dry', false) === true) {
        return missingOnes;
    }

    // No missing dependency found
    if (Object.keys(missingOnes).length === 0) {
        return missingOnes;
    }

    // Append all missing dependencies to the package.json
    writePkg.sync(
        merge(pkg, { [key]: missingOnes })
    );

    log.info(`Installing missing ${key}…`, 1, 1);

    // Install them via npm
    shell.exec('npm install');

    return missingOnes;
};
