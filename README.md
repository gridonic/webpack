<p align="center">
  <img width="60%" src="https://gridonic.github.io/assets/images/logos/webpack.svg"><br>
  Our <strong>pre-configured</strong> webpack. Nothing more, nothing less.
</p>

<br>

## How to use?

> It’s recommended to use our [@gridonic/cli](https://github.com/gridonic/cli) since it will setup your project accordingly and completely automatically.
<br>

If you need to set up your project **manually**, those steps will get you up and running:

1. `npm install --save-dev @gridonic/webpack`  
    
    This will install our npm package.
    
2. `touch webpack.config.js`
    
    This creates a webpack.config.js file and a very simple configuration could look like this:
    
    ```js
    const {
        development,
        production
    } = require('@gridonic/webpack');

    module.exports = (env) => {
        const config = env === 'production' ? production : development;

        return config({
            /* webpack options */
        });
    };
    ```
    
3. Add npm scripts to your `package.json`.

    ```json
    {
      "scripts": {
        "dev": "gridonic-webpack",
        "build": "gridonic-webpack --production"
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

This package also comes with a CLI. Run `npx gridonic-webpack --help` for more information.

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

## Third party configurations

We also provide default configurations for each preset for common third party tools like ESLint, Babel and PostCSS. For example:

```js
// postcss.config.js

const pkg = require('./package.json');

module.exports = ({ options }) => require('@gridonic/webpack').configs.postcss({
    mode: options.mode,
    replace: {
        data: pkg
    }
});
```

If you have a “vanilla” JavaScript project, there is/will be a Babel and ESLint configuration for each ECMAScript version within the `configs` key.

Currently supported ECMAScript versions:

- [6](https://www.ecma-international.org/ecma-262/6.0/index.html) (e.g. `require('@gridonic/webpack').configs.es6`)

You can apply/extend those configurations like this:

```js
// babel.config.js

module.exports = require('@gridonic/webpack').configs.es6.babel(/* { options } */);
```

```js
// .eslintrc.js

module.exports = require('@gridonic/webpack').configs.es6.eslint(/* { options } */);
```

<br>

## Examples

### Importing arbitrary files as strings

Let’s say you need to import `.csv` files for example. In that case you’ll need to add the [`raw`] preset and adjust the `test` RegEx.

```js
// webpack.config.js

module.exports = env => require('@gridonic/webpack')[
    env === 'production' ? 'production' : 'development'
]({
    presets: [
        ['raw', { test: /\.csv$/ }]
    ]
});
```

That’s it. You now can import your `.csv` files as strings.

```js
import TopTenCommits from './TopTenCommits.csv';

console.log(TopTenCommits);
```

<br>

### Develop a [Vue.js] application

Setting up the build environment for a [Vue.js] application is straight forward.

```js
// webpack.config.js

const {
    development,
    production
} = require('@gridonic/webpack');

module.exports = (env) => {
    const config = env === 'production' ? production : development;

    return config({
        presets: ['vue']
    });
};
```

```js
// babel.config.js

module.exports = require('@gridonic/webpack').configs.vue.babel(/* { options } */);
```

```js
// .eslintrc.js

module.exports = require('@gridonic/webpack').configs.vue.eslint(/* { options } */);
```

```js
// postcss.config.js

const pkg = require('./package.json');

module.exports = ({ options }) => require('@gridonic/webpack').configs.postcss({
    mode: options.mode,
    replace: {
        data: pkg
    }
});
```

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
