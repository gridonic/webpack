# Changelog
All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

<br>

Looking for [unreleased] changes?

<br>

## [1.2.2]
###### 2019-05-22

###### Fixed

- Default value for `output.filename` in Statamic’s preset not being considered

## [1.2.1]
###### 2019-05-22

###### Fixed

- HMR: Using wrong socketjs port when auto detecting
- Statamic preset now should work like a charm


###### Changed

- Do **not** open page by default
- Do not use miniCssExtract in non-production ([4aa8846])
- Update dependencies ([4d54ad8])


## [1.2.0]
###### 2019-05-20

###### Fixed

- Missing `devServer` resulting in an error
- `output.publicPath` replacing `https` unnecessarily
- Vue: Using wrong key for html template path
- Use non-zero exit code when build fails

###### Added

- CLI: `--debug` flag
- [Stylelint] ([#3])
- Allow disabling plugins if their configuration is set to `false`


## [1.1.0]
###### 2019-04-12

###### Fixed

- Use `devServer.public` for hmr client entry, and fallback to `host:port` otherwise
- Webpack options not being passed to presets

###### Changed

- Remove `disableHostCheck` from `https` preset as this is a bad practice

###### Added

- Vue: Set default html template path to `./src/html/index.ejs`
- Export `path.resolve` as `resolve`
- Add Statamic preset 😎


## [1.0.0]
###### 2019-04-08

###### Fixed

- Source maps not being generated for CSS/Sass
- Eslint: Options being ignored
- Improve webpack speed by faster source maps
- Env helper throwing error if `.env` is not found
- Clean: Adjust arguments in common preset
- Logging wrong URL in `https` mode

###### Changed

- Improve `https` preset and documentation
- Vue: Improve default settings

###### Added

- Babel: Allow overwriting configuration


## [0.4.5]
###### 2019-03-20

###### Fixed

- Update `package-lock.json` (fixes the "fix" from 0.4.4 🙈)


## [0.4.4]
###### 2019-03-20

###### Fixed

- Move `dotenv` to `dependencies` in `package.json`


## [0.4.3]
###### 2019-03-19

###### Added

- New preset `https` for using https with `devServer`  


## [0.4.2]
###### 2019-03-07

###### Fixed

- YAML: Importing files resulting in a `Module parse failed: Unexpected token` error
- YAML: Importing files without file extension not working


## [0.4.1]
###### 2019-02-28

###### Fixed

- Clean: Fixed `path` option not working
- Loading faulty/missing `webpack.config.js` now returns richer errors
 

## [0.4.0]
###### 2019-02-27

###### Fixed

- Vue: Allow importing vue files without `.vue` extension
- HTML plugin not being loaded without options
- `mini-css-extract-plugin` ending up in webpack config multiple times

###### Added

- CLI: Remove binary and add commands/flags for [@gridonic/cli] (**BREAKING**)
- CLI: Tell user when it’s installing dependencies
- Add `extendConfig` helper
- Babel: Enable cache, which reduces compilation time by 50%

###### Changed

- CLI: Replace `jsome` with `sapegin/q-i` as output has much more information
- DevServer: Make it more quiet


## [0.3.0]
###### 2019-02-11

###### Fixed

- Do not ignore options that are not preconfigured

###### Added

- CLI: Add `--dump` flag

###### Changed

- Drop [write-file-webpack-plugin](https://github.com/gajus/write-file-webpack-plugin) since [webpack-dev-middleware](https://github.com/webpack/webpack-dev-middleware#writetodisk) supports this already
- ESLint: Allow overriding `exclude` and turn off [autofix](https://eslint.org/docs/user-guide/command-line-interface#fixing-problems)
- DevServer: Should be accessible externally by default
- DevServer: `contentBase` is current working directory now by default


## [0.2.2]
###### 2019-02-08

###### Changed

- HMR is enabled via CLI flag now and not via configuration. See [#1] for details.


## [0.2.1]
###### 2019-02-04

###### Fixed

- Sass should pass it’s options along to CSS now
- Vue preset does not install dependencies any longer when it’s not being used


## [0.2.0]
###### 2019-02-04

###### Fixed

- Vue: Allow yaml content for i18n tags
- Vue: `vue-loader` not finding `vue-template-compiler`
- Babel: Add `core-js` for `useBuiltIns: 'usage'`

###### Added

- Handle fonts like `woff` and `woff2`
- Add `file` preset
- Add `yaml` preset
- Vue: Add `vue-i18n-loader`
- Install `vue` preset dependencies automatically
- Allow webpack dev-server to write to disk 🎉
- Add `gridonic-webpack` CLI

###### Changed

- Remove defaults from raw preset
- `options.preset` should not contain functions
- Use webpack internal overlay


## 0.1.0
###### 2019-01-23

First version ready for internal testing.

[unreleased]: https://github.com/gridonic/webpack/compare/1.2.2...HEAD
[1.2.2]: https://github.com/gridonic/webpack/compare/1.2.1...1.2.2
[1.2.1]: https://github.com/gridonic/webpack/compare/1.2.0...1.2.1
[1.2.0]: https://github.com/gridonic/webpack/compare/1.1.0...1.2.0
[1.1.0]: https://github.com/gridonic/webpack/compare/1.0.0...1.1.0
[1.0.0]: https://github.com/gridonic/webpack/compare/0.4.5...1.0.0
[0.4.5]: https://github.com/gridonic/webpack/compare/0.4.4...0.4.5
[0.4.4]: https://github.com/gridonic/webpack/compare/0.4.3...0.4.4
[0.4.3]: https://github.com/gridonic/webpack/compare/0.4.2...0.4.3
[0.4.2]: https://github.com/gridonic/webpack/compare/0.4.1...0.4.2
[0.4.1]: https://github.com/gridonic/webpack/compare/0.4.0...0.4.1
[0.4.0]: https://github.com/gridonic/webpack/compare/0.3.0...0.4.0
[0.3.0]: https://github.com/gridonic/webpack/compare/0.2.2...0.3.0
[0.2.2]: https://github.com/gridonic/webpack/compare/0.2.1...0.2.2
[0.2.1]: https://github.com/gridonic/webpack/compare/0.2.0...0.2.1
[0.2.0]: https://github.com/gridonic/webpack/compare/0.1.0...0.2.0

[#1]: https://github.com/gridonic/webpack/pull/1
[#3]: https://github.com/gridonic/webpack/issues/3

[4aa8846]: https://github.com/gridonic/webpack/commit/4aa88465a7b6fd1ea201f9ab84cf7d519c1fdbc4
[4d54ad8]: https://github.com/gridonic/webpack/commit/4d54ad8c09c43686bd9142e794e076e5c116fa11

[@gridonic/cli]: https://github.com/gridonic/cli
[Stylelint]: https://stylelint.io/
