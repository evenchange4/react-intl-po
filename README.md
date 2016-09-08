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


## Installation

```console
$ npm install react-intl-po --save
```

## Requirements and Workflow

- react-intl
- babel-plugin-react-intl

![RIP Workflow](./docs/workflow.png)


## Usage

There are two sub-commands of `react-intl-po` or `rip`:

1. json2pot: Convert `babel-plugin-react-intl`'s output json file to one .pot file.
2. po2json: Convert one translated .po file back to json format.

### json2pot

```
$ rip json2pot '_translations/src/**/*.json' \
    -o ./mcs-public.pot
```

| **Arguments** |  **Description**                              |
| ------------- | --------------------------------------------- |
| `srcPatterns` |  `babel-plugin-react-intl`'s output json file |
| `output (-o)` |  `.pot` file to be translated                 |

### po2json

```
$ rip po2json './node_modules/mcs-translation/po/mcs-public*.po' \
    -m './_translations/src/**/*.json' \
    -o './translations.json'
    [--multi]
```

| **Arguments**          |  **Description**                                 |
| ---------------------- | ------------------------------------------------ |
| `srcPatterns`          |  translated `.po` files                          |
| `messagesPattern (-m)` |  `babel-plugin-react-intl`'s output json file    |
| `output (-o)`          |  output one json formated file to be used in SSR |
| `--multi`              |  output one json file for each po input file     |


## API

```
```

## Property


## Test

```
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
