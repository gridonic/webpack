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
| [`raw`] | Use this if you need to import files as strings. |
| [`vue`] | Use this if you are going to develop a [Vue.js] application. |


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

#  
<p align="center">
  <a href="https://gridonic.ch">gridonic.ch</a> ・
  <a href="https://gridonic.github.io">gridonic.github.io</a> ・
  <a href="https://twitter.com/gridonic">@gridonic</a>
</p>


[`file`]: ./src/presets/file.js
[`raw`]: ./src/presets/raw.js
[`vue`]: ./src/presets/vue.js

[Vue.js]: https://vuejs.org/
[ESLint]: https://eslint.org/
[Babel]: https://babeljs.io/
[PostCSS]: https://postcss.org/
[Sass]: https://sass-lang.com/
[Imagemin]: https://github.com/imagemin/imagemin
[@gridonic/cli]: https://github.com/gridonic/cli
[@gridonic/generator]: https://github.com/gridonic/generator
