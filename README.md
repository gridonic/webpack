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

If you don’t have to tweak or adjust our default configurations this one-liner*ish* webpack configuration might just do fine.

`webpack.config.js`
```js
const { development, production } = require('@gridonic/webpack');

module.exports = env => env === 'production' ? production() : development();
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

- `webpack.dev.js`
  
  ```js
  const { development } = require('@gridonic/webpack');
  
  module.exports = development();
  ```

- `webpack.prod.js`
  
  ```js
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
