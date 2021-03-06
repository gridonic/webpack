<p align="center">
  <img width="60%" src="https://gridonic.github.io/assets/images/logos/webpack.svg"><br>
  Our <strong>pre-configured</strong> webpack. Nothing more, nothing less.
</p>

<br>

## How to use?

⚠️ It’s **highly** recommended to use our [@gridonic/cli] since it can scaffold your project and works seamlessly with our webpack.

<br>

### Manual setup

If you need to set up your project **manually**, those steps will get you up and running:

1. `npm install --save-dev @gridonic/webpack`  
    
    This will install our npm package.
    
2. `touch webpack.config.js`
    
    This creates a webpack.config.js file and a very simple configuration could look like this:
    
    ```js
    const { extendConfig } = require('@gridonic/webpack');
    
    module.exports = extendConfig
        .forDevelopment({ /* Options for development only */ })
        .forProduction({ /* Options for production only */ })
        .forAll({ /* Options for all environments */ })
        .toConfig;
    ```
    
3. Add npm scripts to your `package.json`. This is **optional** if you have our CLI installed **globally**.

    ```json
    {
      "scripts": {
        "dev": "webpack-dev-server --hot",
        "build": "webpack --mode=production"
      }
    }
    ``` 

Finally you…

- run `npm run dev` if you want to **develop on your project**, or 
- run `npm run build` if you want to **ship your code**.

**Simple, right?** Without any adjustments our pre-configured webpack runs with …

- [ESLint]
- [Babel]
- [PostCSS]
- [Sass]
- [Imagemin]
- [Vue.js] (via preset, see examples)

<br>

## CLI

This package provides commands and flags for our [@gridonic/cli].

<br>

## Presets

Our webpack setup should be flexible and simple to use at the same time. That’s why we have configurable presets for tasks that come up frequently but are not included in the default core configuration.

<br>

### List of available presets

| Preset | Description |
| -------- | -------- |
| [`file`] | Use this if you need to add files in general (e.g. video in html). |
| [`https`] | Enable HTTPS support for webpack devServer. |
| [`raw`] | Use this if you need to import files as strings. |
| [`statamic`] | Use this if you are running with [Statamic]. |
| [`vue`] | Use this if you are going to develop a [Vue.js] application. |
| [`yaml`] | Adds support for importing [YAML] files. |
| [`copy`] | Use this if you need to copy static files. |


<br>

## Examples

### Importing arbitrary files as strings

Let’s say you need to import `.csv` files for example. In that case you’ll need to add the [`raw`] preset and adjust the `test` RegEx.

```js
// webpack.config.js

const { extendConfig } = require('@gridonic/webpack');
    
module.exports = extendConfig
    .usePreset('raw', { test: /\.csv$/ })
    .toConfig;
```

That’s it. You now can import your `.csv` files as strings.

```js
import TopTenCommits from './TopTenCommits.csv';

console.log(TopTenCommits);
```

<br>

### Develop a [Vue.js] application

Setting up the build environment for a [Vue.js] application is straight forward if you use our [@gridonic/generator] and [@gridonic/cli]. If you want to do it manually you will still have a pain free life. 

```js
// webpack.config.js

const { extendConfig } = require('@gridonic/webpack');

module.exports = extendConfig
    .usePreset('vue')
    .toConfig;
```

Looking for third party configuration files like [Babel], [ESLint] or [PostCSS]? Feel free to use what ever you may like.

<br>

### Enable HTTPS support for webpack’s devServer

Add the `https` preset to your webpack configuration. By default, the config expects a certificate authority (`ca.pem`) file, a server certificate (`server.crt`) file and a server key (`server.key`) file under the `/usr/local/etc/httpd/ssl` folder. 

⚠️ These files **must** be used by your local web server as well.

```js
// webpack.config.js

const { extendConfig } = require('@gridonic/webpack');

module.exports = extendConfig
    .usePreset('https')
    .toConfig;
```

If you store your SSL files in another location, you can specify them in your local `.env` file. For example:

```env
# .env

SSL_CA=/etc/httpd/ssl/ca.pem
SSL_CERT=/etc/httpd/ssl/server.crt
SSL_KEY= /etc/httpd/ssl/server.key
```

<br>

### Develop a (Vue) application with Statamic as a backend

We have a preset for [Statamic] related development. This should set up webpack accordingly. Currently those options are available specifically to this preset:

| Preset | Description |
| -------- | -------- |
| `assetsPath` | Alias for `output.path`. |
| `publicPath` | Alias for `output.publicPath`. This option will be used for **production only.** ⚠️ |
| `vhost` | Provide the vhost of your Statamic website. This domain will be whitelisted by the webpack dev server. |

See below for an example.

```js
// webpack.config.js

const { extendConfig, resolve } = require('@gridonic/webpack');

module.exports = extendConfig
    .usePreset('vue')
    .usePreset('statamic', {
        assetsPath: resolve('../public/themes/my-theme/assets/'),
        publicPath: '/themes/my-theme/assets/',
        vhost: 'local.my-theme.gridonic.ch',
    })
    .toConfig;
``` 

<br>

#  
<p align="center">
  <a href="https://gridonic.ch">gridonic.ch</a> ・
  <a href="https://gridonic.github.io">gridonic.github.io</a> ・
  <a href="https://twitter.com/gridonic">@gridonic</a>
</p>


[`https`]: ./src/presets/https.js
[`file`]: ./src/presets/file.js
[`raw`]: ./src/presets/raw.js
[`vue`]: ./src/presets/vue.js
[`yaml`]: ./src/presets/yaml.js
[`statamic`]: ./src/presets/statamic.js
[`copy`]: ./src/presets/copy.js

[Vue.js]: https://vuejs.org/
[YAML]: https://yaml.org/
[ESLint]: https://eslint.org/
[Babel]: https://babeljs.io/
[PostCSS]: https://postcss.org/
[Sass]: https://sass-lang.com/
[Imagemin]: https://github.com/imagemin/imagemin
[@gridonic/cli]: https://github.com/gridonic/cli
[@gridonic/generator]: https://github.com/gridonic/generator
[Statamic]: https://statamic.com/
