# node-containerpattern
A basic 'Container pattern' object for a clean global use of data.
Basicaly, it extends Map object with control and recursive methods


## Installation

```bash
$ npm install node-containerpattern
```

## Features

  * Remember data by there choosen keys
  * use optional skeleton to ensure data formats
  * Access to the data easily and recursively
  * Manipule the data : add, delete, ...

## Doc

  -- Attributes --

  * ``` int size ``` keys counter
  * ``` string recursionSeparator ``` used to parse recursive keys
  * ``` object skeletons ``` used to force data type
  * ``` object limits ``` used to limit data

  -- Constructor --

  * ``` constructor([ string recursionSeparator = "." ]) ```

  -- Methods --

  * ``` bindSkeleton(string key, string skeleton) : return this ``` skeleton must be "string", "object", "array", "boolean", "integer", "float" or "number"
  * ``` clear() : return this ``` clearData & clearDocumentation & clearLimits & clearSkeleton
  * ``` clearData() : return this ``` forget all the keys and there values and documentations (=> Map.clear)
  * ``` clearDocumentation() : return this ``` forget all the skeletons
  * ``` clearLimits() : return this ``` forget all the limits
  * ``` clearSkeleton() : return this ``` forget all the skeletons
  * ``` delete(string key) : return this ``` forget a key and its value
  * ``` document(string key, string documentation) : return this ``` attach a documentation on the data. only visible if "set" method is applied with this key.
  * ``` documentation() : return JSON object ``` generate a documentation for all the stored data
  * ``` get(string key) : return mixed ``` return the value in association with this key (may be recursive)
  * ``` has(string key) : return bool ``` check if a key is used (may be recursive)
  * ``` limit(string key, array limit) : return this ``` associate a key with a limit
  * ``` set(string key, mixed value) : return this ``` associate and remember a key with a value (may be recursive)

## Examples

```js
const Container = require('node-containerpattern');
var container = new Container();

// in skeleton, 'typeof' can be = 'string', 'object', 'array', 'boolean', 'integer', 'float', 'number'
// if typeof is 'array' or 'object', and value data is a string, JSON.parse is apply before throw any error

container
  .bindSkeleton("debug", "boolean").document("debug", "This is the debug module")
  .bindSkeleton("vat", "float")
  .bindSkeleton("heigth", "integer")

  .set('debug', true) // '"yes"', '"y"', '"1"', '1', '"true"' or 'true' => get = true, else => get = false
  .set('vat', '5.5').set('vat', 5.5)
  .set('conf', { usr : { login : 'login', pwd : 'pwd' } })
  .set('conf.usr.login', "login2")
  .set('object', new Object())

  .limit("debug", [true, false]); // debug is now limited to 'true' or 'false'

console.log(container.get('conf').usr.login);
console.log(container.get('conf.usr.login'));
console.log(container.get('object'));
console.log(container.get('conf'));

container.delete('object');

console.log(container.has('object'));
console.log(container.size);

for (let key of container.keys()) {
  console.log(key);
}
for (let value of container.values()) {
  console.log(value);
}

container.forEach(function(value, key) {
  console.log("container[" + key + "] = " + value);
});

console.log(container.documentation());

container.clear();
```

## Tests

```bash
$ gulp
```

## License

  [ISC](LICENSE)
