![webpack](media/logo.png)

## How to use?

First of all you’ll need to install our npm package.

`npm install --save-dev @gridonic/webpack`

No matter if you are going to use it out of the box or if you adjust it (heavily), in both cases you…

- run `npm run dev` if you want to **develop on your project**, or 
- run `npm run build` if you want to **ship your code**.

Simple, right? 

<br>

### Out of the box

If you don’t have to tweak or adjust our default configurations this one-liner webpack configuration might just do fine.

```js
// webpack.config.js
module.exports = env => require('@gridonic/webpack')[
    env === 'production' ? 'production' : 'development'
]();
```

Then you’ll just have to use those two npm scripts in your `package.json`…

```json
{
  "scripts": {
    "dev": "webpack-dev-server",
    "build": "webpack --env production"
  }
}
``` 

<br>

### More customized

If you need to customize the webpack configuration we recommend setting up 2 (**two**) webpack configuration files. One for **development** and one for **production mode**.

```js
// webpack.dev.js
const { development } = require('@gridonic/webpack');

module.exports = development();
```

```js
// webpack.prod.js
const { production } = require('@gridonic/webpack');

module.exports = production();
```

Almost done. Just add these two scripts to your `package.json`…

```json
{
  "scripts": {
    "dev": "webpack-dev-server --config webpack.dev.js",
    "build": "webpack --config webpack.prod.js"
  }
}
```

<br>

## Presets

Our webpack setup should be flexible and simple to use at the same time. That’s why we have configurable presets for tasks that come up frequently but are not included in the default core configuration.

### List of available presets

| Preset | Description |
| -------- | -------- |
| [`raw`] | Use this in case you need to import files as strings. |
| [`vue`] | Use this if you are going to develop a Vue application. |


### How to use them?

Let’s say you need to import `.csv` files for example. In that case you’ll need to add the [`raw`] preset and adjust the `test` RegEx.

```js
// webpack.config.js
module.exports = env => require('@gridonic/webpack')[
    env === 'production' ? 'production' : 'development'
]({
    presets: [
        raw({ test: /\.csv$/ })
    ]
});
```

That’s it. You now can import your `.csv` files as strings.

```js
import TopTenCommits from './TopTenCommits.csv';

console.log(TopTenCommits);
```



[`raw`]: ./src/presets/raw.js
[`vue`]: ./src/presets/vue.js
