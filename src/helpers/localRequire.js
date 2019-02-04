const delve = require('dlv');
const readPkg = require('read-pkg');
const writePkg = require('write-pkg');
const merge = require('webpack-merge');
const shell = require('shelljs');

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

    // Install them via npm
    shell.exec('npm install');

    return missingOnes;
};