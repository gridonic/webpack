<p align="center">
    <a href="https://git.gridonic.ch/gridonic/webpack">
        <img src="./media/logo.svg" width="256" alt="webpack">
    </a><br><br>
</p>
<p align="center">Our webpack setup.</p><br>

## How to use?

Using our webpack configuration is pretty simple. We recommend setting up 2 (**two**) webpack configuration files. One for **development** and one for **production mode**.

- `webpack.dev.js`
  
  ```js
  const { development } = require('@gridonic/webpack');
  
  module.exports = development;
  ```

- `webpack.prod.js`
  
  ```js
  const { production } = require('@gridonic/webpack');
  
  module.exports = production;
  ```

Almost done. Run `npm i @gridonic/webpack` and add these two scripts to your `package.json`…

```json
{
  "scripts": {
    "dev": "webpack-dev-server --open --config webpack.dev.js",
    "build": "webpack --config webpack.prod.js"
  }
}
```

Now you are good to go. Run `npm run dev` if you want to develop on your project, `npm run build` if you want to ship your code. 
