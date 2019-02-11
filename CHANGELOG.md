# Changelog
All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

<br>

Looking for [unreleased] changes?

<br>

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

[unreleased]: https://github.com/gridonic/webpack/compare/0.3.0...HEAD
[0.3.0]: https://github.com/gridonic/webpack/compare/0.2.2...0.3.0
[0.2.2]: https://github.com/gridonic/webpack/compare/0.2.1...0.2.2
[0.2.1]: https://github.com/gridonic/webpack/compare/0.2.0...0.2.1
[0.2.0]: https://github.com/gridonic/webpack/compare/0.1.0...0.2.0

[#1]: https://github.com/gridonic/webpack/pull/1
