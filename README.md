# node-containerpattern
A 'Container pattern' object for a clean global use of data.
Basicaly, it extends Map object with lot of controls, recursive methods and documentation

[![Lines of Code](https://sonarcloud.io/api/project_badges/measure?project=Psychopoulet_node-containerpattern&metric=ncloc)](https://sonarcloud.io/summary/new_code?id=Psychopoulet_node-containerpattern)
[![Issues](https://img.shields.io/github/issues/Psychopoulet/node-containerpattern.svg)](https://github.com/Psychopoulet/node-containerpattern/issues)
[![Pull requests](https://img.shields.io/github/issues-pr/Psychopoulet/node-containerpattern.svg)](https://github.com/Psychopoulet/node-containerpattern/pulls)

[![Reliability Rating](https://sonarcloud.io/api/project_badges/measure?project=Psychopoulet_node-containerpattern&metric=reliability_rating)](https://sonarcloud.io/summary/new_code?id=Psychopoulet_node-containerpattern)
[![Security Rating](https://sonarcloud.io/api/project_badges/measure?project=Psychopoulet_node-containerpattern&metric=security_rating)](https://sonarcloud.io/summary/new_code?id=Psychopoulet_node-containerpattern)
[![Maintainability Rating](https://sonarcloud.io/api/project_badges/measure?project=Psychopoulet_node-containerpattern&metric=sqale_rating)](https://sonarcloud.io/summary/new_code?id=Psychopoulet_node-containerpattern)
[![Vulnerabilities](https://sonarcloud.io/api/project_badges/measure?project=Psychopoulet_node-containerpattern&metric=vulnerabilities)](https://sonarcloud.io/summary/new_code?id=Psychopoulet_node-containerpattern)
[![Bugs](https://sonarcloud.io/api/project_badges/measure?project=Psychopoulet_node-containerpattern&metric=bugs)](https://sonarcloud.io/summary/new_code?id=Psychopoulet_node-containerpattern)

[![Known Vulnerabilities](https://snyk.io/test/github/Psychopoulet/node-containerpattern/badge.svg)](https://snyk.io/test/github/Psychopoulet/node-containerpattern)

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

## Tests

```bash
$ npm run-script tests
```

## License

  [ISC](LICENSE)
