# react-intl-po

> Extract POT from react-intl and convert back to json.
>
> messages.json → POT → PO → translation.json

[![Travis][build-badge]][build] [![Coverage Status][coveralls-badge]][coveralls] [![npm package][npm-badge]][npm] [![npm downloads][npm-downloads]][npm] [![license][license-badge]][license]

[build-badge]: https://img.shields.io/travis/evenchange4/react-intl-po/master.svg?style=flat-square
[build]: https://travis-ci.org/evenchange4/react-intl-po

[npm-badge]: https://img.shields.io/npm/v/react-intl-po.svg?style=flat-square
[npm]: https://www.npmjs.org/package/react-intl-po

[coveralls-badge]: https://img.shields.io/coveralls/evenchange4/react-intl-po/master.svg?style=flat-square
[coveralls]: https://coveralls.io/github/evenchange4/react-intl-po

[npm-downloads]: https://img.shields.io/npm/dt/react-intl-po.svg?style=flat-square

[license-badge]: https://img.shields.io/npm/l/react-intl-po.svg?style=flat-square
[license]: http://michaelhsu.mit-license.org/

## Installation

```console
$ npm install react-intl-po --save
```

## Requirements

- react-intl
- babel-plugin-react-intl

## Usage

There are two sub-commands of `rip`:

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
```

| **Arguments**          |  **Description**                                |
| ---------------------- | ----------------------------------------------- |
| `srcPatterns`          |  translated `.po` files                         |
| `messagesPattern (-m)` |  `babel-plugin-react-intl`'s output json file   |
| `output (-o)`          |  ouput one json formated file to be used in SSR |


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
