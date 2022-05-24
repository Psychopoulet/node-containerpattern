# node-containerpattern
A 'Container pattern' object for a clean global use of data.
Basicaly, it extends Map object with lot of controls, recursive methods and documentation

[![Build status](https://api.travis-ci.org/Psychopoulet/node-containerpattern.svg?branch=master)](https://travis-ci.org/Psychopoulet/node-containerpattern)
[![Coverage status](https://coveralls.io/repos/github/Psychopoulet/node-containerpattern/badge.svg?branch=master)](https://coveralls.io/github/Psychopoulet/node-containerpattern)
[![Dependency status](https://david-dm.org/Psychopoulet/node-containerpattern/status.svg)](https://david-dm.org/Psychopoulet/node-containerpattern)
[![Dev dependency status](https://david-dm.org/Psychopoulet/node-containerpattern/dev-status.svg)](https://david-dm.org/Psychopoulet/node-containerpattern?type=dev)
[![Issues](https://img.shields.io/github/issues/Psychopoulet/node-containerpattern.svg)](https://github.com/Psychopoulet/node-containerpattern/issues)
[![Pull requests](https://img.shields.io/github/issues-pr/Psychopoulet/node-containerpattern.svg)](https://github.com/Psychopoulet/node-containerpattern/pulls)

## Installation

```bash
$ npm install node-containerpattern
```

## Features

  * Remember data by there choosen keys
  * use optional skeleton to ensure data formats
  * Access to the data easily and recursively
  * Check recursively data by the key and the value
  * Manipule the data : set, get, has, delete, ...
  * Easily create documenation

## Doc

### Inheritance

[check the official 'Map' object documentation](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map)

### Content

[check the TypeScript definition file](https://github.com/Psychopoulet/node-containerpattern/blob/master/lib/index.d.ts)

### Notes

  * if the skeleton is an 'array' or an 'object', and value data is a string, JSON.parse is apply before throw any error
  * if the skeleton is an 'color', 'email', 'ipv4', 'ipv6', 'url', value must be a string. it can be empty, but must be a valid address if not

## Examples

[check the TypeScript compilation tests](https://github.com/Psychopoulet/node-containerpattern/blob/master/test/typescript/compilation.ts)

```

## Tests

```bash
$ npm run-script tests
```

## License

  [ISC](LICENSE)
