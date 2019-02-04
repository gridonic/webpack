# Changelog
All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

<br>

Looking for [unreleased] changes?

<br>

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

[unreleased]: https://github.com/gridonic/webpack/compare/0.2.1...HEAD
[0.2.1]: https://github.com/gridonic/webpack/compare/0.2.0...0.2.1
[0.2.0]: https://github.com/gridonic/webpack/compare/0.1.0...0.2.0
