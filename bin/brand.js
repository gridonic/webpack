const chalk = require('chalk');
const shuffle = require('shuffle-array');

const { name, version, description } = require('../package.json');

const randomColor = () => shuffle.pick([
    'red',
    'green',
    'yellow',
    'blue',
    'magenta',
    'cyan'
]);

// @see https://www.ascii-art-generator.org/
// @see https://www.text-image.com/convert/ascii.html
module.exports = chalk`{gray
          '/.
        '/dMNo.
      '/dMNymMNo.
     /dMNs. '+mMNo'
     /dMMs. '/mMNs'
'/.   '/dMNydMNs.   '/.
sMm-    '/dMMN:    'yMd.
':.       '/dMNs.   '/.
     /ds.   '/mMNs'
     /dMNs. '+MMMo'
      '/dMNydMmo.         {${randomColor()} ${name}} {gray (v${version})}
        .hMMMN:           
      '/dMNsdMNs.         {white ${description}}
     /dMNs. '/dMNs'
     :hs.     '/do'
}`;
