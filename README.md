# react-intl-po

> Extract POT from react-intl and convert back to json.
>
> messages.json → POT → PO → translation.json

[![Travis][build-badge]][build] [![Codecov Status][codecov-badge]][codecov] [![npm package][npm-badge]][npm] [![npm downloads][npm-downloads]][npm] [![license][license-badge]][license]

[![Dependency Status][dependency-badge]][dependency] [![devDependency Status][devDependency-badge]][devDependency] [![peerDependency Status][peerDependency-badge]][peerDependency]

[build-badge]: https://img.shields.io/travis/evenchange4/react-intl-po/master.svg?style=flat-square
[build]: https://travis-ci.org/evenchange4/react-intl-po

[npm-badge]: https://img.shields.io/npm/v/react-intl-po.svg?style=flat-square
[npm]: https://www.npmjs.org/package/react-intl-po

[codecov-badge]: https://img.shields.io/codecov/c/github/evenchange4/react-intl-po.svg?style=flat-square
[codecov]: https://codecov.io/github/evenchange4/react-intl-po?branch=master

[npm-downloads]: https://img.shields.io/npm/dt/react-intl-po.svg?style=flat-square

[license-badge]: https://img.shields.io/npm/l/react-intl-po.svg?style=flat-square
[license]: http://michaelhsu.mit-license.org/

[dependency-badge]: https://david-dm.org/evenchange4/react-intl-po.svg?style=flat-square
[dependency]: https://david-dm.org/evenchange4/react-intl-po
[devDependency-badge]: https://david-dm.org/evenchange4/react-intl-po/dev-status.svg?style=flat-square
[devDependency]: https://david-dm.org/evenchange4/react-intl-po#info=devDependencies
[peerDependency-badge]: https://david-dm.org/evenchange4/react-intl-po/peer-status.svg?style=flat-square
[peerDependency]: https://david-dm.org/evenchange4/react-intl-po#info=peerDependencies
[![Greenkeeper badge](https://badges.greenkeeper.io/evenchange4/react-intl-po.svg)](https://greenkeeper.io/)

## Demo

Standalone example based on Create-React-App: https://github.com/evenchange4/react-intl-po-example

## Installation

```console
$ npm install react-intl-po --save
```

## Requirements and Workflow

- [react-intl](https://github.com/yahoo/react-intl) `^2.0.0`
- [babel-plugin-react-intl](https://github.com/yahoo/babel-plugin-react-intl) `^2.0.0`

![RIP Workflow](./docs/workflow.png)


## Usage

There are two sub-commands of `react-intl-po` or `rip`:

1. json2pot: Convert the json files extracted from *babel-plugin-react-intl* into one `.pot` file.
2. po2json: Convert translated *.po* files back to `.json` format.

### json2pot

```
$ rip json2pot '_translations/src/**/*.json' \
    -o ./mcs-public.pot
```

| **Arguments**      |  **Description**                                                       |
| ------------------ | ---------------------------------------------------------------------- |
| `srcPatterns`      |  The pattern of *.json* files extracted from *babel-plugin-react-intl* |
| `output (-o)`      |  The output pathname of *.pot* file to be translated                   |
| `message-key (-k)` |  [Optional] Translation message key (default key is `defaultMessage`)  |

### po2json

#### Case 1: Output one file per locale if a `directory` is set

```
$ rip po2json './node_modules/mcs-translation/po/mcs-public*.po' \
     -m './_translations/src/**/*.json' \
     -o './translations'
```

#### Case 2: Output one merged file if a `.json file` is set

```
$ rip po2json './node_modules/mcs-translation/po/mcs-public*.po' \`
     -m './_translations/src/**/*.json' \
     -o './translations.json'
```

| **Arguments**          |  **Description**                                                       |
| ---------------------- | ---------------------------------------------------------------------- |
| `srcPatterns`          |  The pattern of translated *.po* files                                 |
| `messagesPattern (-m)` |  The pattern of *.json* files extracted from *babel-plugin-react-intl* |
| `output (-o)`          |  The output pathname of a file / directory                             |
| `message-key (-k)`     |  [Optional] Translation message key (default key is `defaultMessage`)  |


## API

```
```

## Property

## Q&A

### How to translate the same message into two different meanings?

Set the `message-key (-k)` to `'id'` of message object from *babel-plugin-react-intl* (default key is `'defaultMessage'`). ([#41](https://github.com/evenchange4/react-intl-po/pull/41))

```
$ rip po2json './node_modules/mcs-translation/po/mcs-public*.po' \
     -m './_translations/src/**/*.json' \
     -o './translations' \
     -k 'id'

$ rip po2json './node_modules/mcs-translation/po/mcs-public*.po' \`
    -m './_translations/src/**/*.json' \
    -o './translations.json' \
    -k 'id'
```

## Test

```
$ npm run lint
$ npm run test:watch
```

---

## CONTRIBUTING

* ⇄ Pull requests and ★ Stars are always welcome.
* For bugs and feature requests, please create an issue.
* Pull requests must be accompanied by passing automated tests (`$ npm test`).

## [CHANGELOG](CHANGELOG.md)

## [LICENSE](LICENSE)

MIT: [http://michaelhsu.mit-license.org](http://michaelhsu.mit-license.org)
