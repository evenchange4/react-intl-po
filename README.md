# react-intl-po

> Extract POT from react-intl and convert back to json.
>
> messages.json → POT → PO → translation.json

[![Travis][build-badge]][build]
[![Codecov Status][codecov-badge]][codecov]
[![npm package][npm-badge]][npm]
[![npm downloads][npm-downloads]][npm]

[![Dependency Status][dependency-badge]][dependency]
[![devDependency Status][devdependency-badge]][devdependency]
[![peerDependency Status][peerdependency-badge]][peerdependency]

[![license][license-badge]][license]
[![prettier](https://img.shields.io/badge/styled_with-prettier-ff69b4.svg)](https://github.com/prettier/prettier)

## Tutorial

Please take a look at standalone repo based on Create-React-App: https://github.com/evenchange4/react-intl-po-example

## Installation

```console
$ yarn add react-intl-po
# or
$ npm install react-intl-po --save
```

## Requirements and Workflow

* [react-intl](https://github.com/yahoo/react-intl) `^2.0.0`
* [babel-plugin-react-intl](https://github.com/yahoo/babel-plugin-react-intl) `^2.0.0`

![RIP Workflow](./docs/workflow.png)

## Usage

There are two sub-commands of `react-intl-po` or `rip`:

1. json2pot: Convert the json files extracted from _babel-plugin-react-intl_ into one `.pot` file.
2. po2json: Convert translated _.po_ files back to `.json` format.

### json2pot

```
$ rip json2pot '_translations/src/**/*.json' \
    -o ./mcs-public.pot
```

| **Arguments**          | **Description**                                                       |
| ---------------------- | --------------------------------------------------------------------- |
| `srcPatterns`          | The pattern of _.json_ files extracted from _babel-plugin-react-intl_ |
| `output (-o)`          | The output pathname of _.pot_ file to be translated                   |
| `message-key (-k)`     | [Optional] Translation message key (default key is `defaultMessage`)  |
| `message-context (-c)` | [Optional] Translation message context (defaults to no context)       |

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

| **Arguments**          | **Description**                                                       |
| ---------------------- | --------------------------------------------------------------------- |
| `srcPatterns`          | The pattern of translated _.po_ files                                 |
| `messagesPattern (-m)` | The pattern of _.json_ files extracted from _babel-plugin-react-intl_ |
| `output (-o)`          | The output pathname of a file / directory                             |
| `message-key (-k)`     | [Optional] Translation message key (default key is `defaultMessage`)  |
| `message-context (-c)` | [Optional] Translation message context (defaults to no context)       |

## Property

## Q&A

### How to translate the same message into two different meanings?

#### Option 1 (Recommended):

Set the `message-context (-c)` to `'id'` of message object from _babel-plugin-react-intl_ (there is no context by default).

The advantage of this option over Option 2 (below) is that PO file editors that provide features such as translation suggestions or error-checking often expect the message key to be `defaultMessage`.

```
$ rip po2json './node_modules/mcs-translation/po/mcs-public*.po' \
     -m './_translations/src/**/*.json' \
     -o './translations' \
     -c 'id'

$ rip po2json './node_modules/mcs-translation/po/mcs-public*.po' \`
    -m './_translations/src/**/*.json' \
    -o './translations.json' \
    -c 'id'
```

Example: https://github.com/evenchange4/react-intl-po-example#option

#### Option 2: [Maybe deprecated next major release]

Set the `message-key (-k)` to `'id'` of message object from _babel-plugin-react-intl_ (default key is `'defaultMessage'`). ([#41](https://github.com/evenchange4/react-intl-po/pull/41))

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

## Development

```console
$ yarn install --pure-lockfile
```

### Ramda.js

You can use `R.tap()` for developing.

```diff
R.pipe(
  R.concat(...),
+ R.tap(e => console.log(e)),
  R.mergeAll,
);
```

### Requirements

* node >= 9.4.0
* yarn >= 1.3.2

### Test

```
$ yarn run format
$ yarn run eslint
$ yarn run test:watch
```

---

## CONTRIBUTING

* ⇄ Pull requests and ★ Stars are always welcome.
* For bugs and feature requests, please create an issue.
* Pull requests must be accompanied by passing automated tests (`$ yarn run test`).

## [CHANGELOG](CHANGELOG.md)

## [LICENSE](LICENSE)

MIT: [http://michaelhsu.mit-license.org](http://michaelhsu.mit-license.org)

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
[devdependency-badge]: https://david-dm.org/evenchange4/react-intl-po/dev-status.svg?style=flat-square
[devdependency]: https://david-dm.org/evenchange4/react-intl-po#info=devDependencies
[peerdependency-badge]: https://david-dm.org/evenchange4/react-intl-po/peer-status.svg?style=flat-square
[peerdependency]: https://david-dm.org/evenchange4/react-intl-po#info=peerDependencies
