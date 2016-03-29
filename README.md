# react-intl-po

> Convert a Float number to percentage with rounding, ceiling or flooring.

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

[Quick DEMO on tonicdev](https://tonicdev.com/evenchange4/react-intl-po)

## Usage

```js
import {
  default as toPercentageBy,
  toPercentage as defaultToPercentageBy,
} from 'react-intl-po';

// defaultToPercentageBy equals to toPercentageBy()

var toPercentage = toPercentageBy();
t.is(toPercentage(0.11111), '11.11%');
t.is(defaultToPercentageBy(0.11111), '11.11%');

var toPercentage = toPercentageBy(0);
t.is(toPercentage(0.11111), '11%');

var toPercentage = toPercentageBy(2, Math.ceil);
t.is(toPercentage(0.11111), '11.12%');

var toPercentage = toPercentageBy(2, Math.floor);
t.is(toPercentage(0.11115), '11.11%');
```

## API

```js
type ToPercentage = (float: number) => string;

toPercentageBy(
  ?digits: number,
  ?method: Function,
): ToPercentage
```

## Property

| **Value** | **Default**  | **Notes**  |
| ------- | ---------- | ------ |
| digits  | 2          | The number of digits to appear after the decimal point |
| method  | Math.round | Could be `Math.round`, `Math.ceil` or `Math.floor` method |
| float  |  | The number to be converted. |

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
