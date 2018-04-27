# node-containerpattern
A 'Container pattern' object for a clean global use of data.
Basicaly, it extends Map object with lot of controls, recursive methods and documentation

[![Build Status](https://api.travis-ci.org/Psychopoulet/node-containerpattern.svg?branch=master)](https://travis-ci.org/Psychopoulet/node-containerpattern)
[![Coverage Status](https://coveralls.io/repos/github/Psychopoulet/node-containerpattern/badge.svg?branch=master)](https://coveralls.io/github/Psychopoulet/node-containerpattern)
[![Dependency Status](https://img.shields.io/david/Psychopoulet/node-containerpattern/master.svg)](https://github.com/Psychopoulet/node-containerpattern)

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

  -- Inheritance --

  [check the official 'Map' object documentation](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map)

  -- Attributes --

  * ``` documentations: object ``` used to save documentation by data's key
  * ``` limits: object ``` used to limit data's values possibilities
  * ``` recursionSeparator: string ``` used to parse recursive keys (default : '.')
  * ``` skeletons: object ``` used to force data type

  -- Constructor --

  * ``` constructor(recursionSeparator: string = ".") ```

  -- Methods --

  * ``` clear(): this ``` clearData & clearDocumentations & clearLimits & clearSkeletons
  * ``` clearData() : this ``` forget all the keys and there values and documentations (=> Map.clear)
  * ``` clearDocumentations() : this ``` forget all the skeletons
  * ``` clearLimits() : this ``` forget all the limits
  * ``` clearSkeletons() : this ``` forget all the skeletons
  * ``` delete(key: string) : this ``` forget a key and its value
  * ``` document(key: string, documentation: string) : this ``` attach a documentation on the data. only visible if "set" method is applied with this key.
  * ``` documentation() : JSON object ``` generate a documentation for all the stored data
  * ``` get(key: string) : mixed ``` the value in association with this key (may be recursive)
  * ``` has(key: string) : bool ``` check if a key is used (may be recursive)
  * ``` limit(key: string, limit: Array<string>) : this ``` associate a key with a limit
  * ``` set(key: string, mixed value) : this ``` associate and remember a key with a value (may be recursive)
  * ``` skeleton(key: string, skeleton: string) : this ``` skeleton must be "array", "boolean", "email", "float", "integer", "ipv4", "ipv6", "number", "object", "string"

  -- notes --

  * if the skeleton is an 'array' or an 'object', and value data is a string, JSON.parse is apply before throw any error
  * if the skeleton is an 'email', value must be a string. it can be empty, but must be a valid address if not

## Examples

### Native

```javascript
const Container = require("node-containerpattern");
const container = new Container();

container
  .skeleton("contact", "email").document("contact", "Contact address")
  .skeleton("debug", "boolean").document("debug", "This is the debug module")
  .skeleton("vat", "float")
  .skeleton("heigth", "integer")

  .set("contact", "myaddress@provider.com")
  .set("debug", true) // '"yes"', '"y"', '"1"', '1', '"true"' or 'true' => get = true, else => get = false
  .set("vat", '5.5').set('vat', 5.5)
  .set("conf", { usr : { login : 'login', pwd : 'pwd' } })
  .set("conf.usr.login", "login2")
  .set("object", new Object())

  .limit("debug", [true, false]); // debug is now limited to 'true' or 'false'

console.log(container.get("conf").usr.login);
console.log(container.get("conf.usr.login"));
console.log(container.get("object"));
console.log(container.get("conf"));

container.delete("object");

console.log(container.has("object"));
console.log(container.size);

for (let key of container.keys()) {
  console.log(key);
}
for (let value of container.values()) {
  console.log(value);
}

container.forEach((value, key) => {
  console.log("container[" + key + "] = " + value);
});

console.log(container.documentation());

container.clear();
```

### Typescript

```typescript
import Container = require("node-containerpattern");
const container = new Container();

container
  .skeleton("contact", "email").document("contact", "Contact address")
  .set("contact", "myaddress@provider.com");

console.log(container.get("contact"));

```

## Tests

```bash
$ gulp tests
```

## License

  [ISC](LICENSE)
