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

* ``` int size ``` keys counter
* ``` string recursionSeparator ``` used to parse recursive keys
* ``` object skeletons ``` used to structure data

* ``` constructor([ string recursionSeparator = "." ]) ```

* ``` bindSkeleton(string key, string skeleton) : return this ``` skeleton must be "string", "object", "array", "boolean", "integer", "float" or "number"
* ``` clearData() : return this ``` forget all the keys and there values and documentations (=> Map.clear)
* ``` clearDocumentation() : return this ``` forget all the skeletons
* ``` clearSkeleton() : return this ``` forget all the skeletons
* ``` clear() : return this ``` clearData & clearDocumentation & clearSkeleton
* ``` documentation() : return object ``` generate a documentation for all the stored data
* ``` get(string key) : return mixed ``` return the value in association with this key (may be recursive)
* ``` has(string key) : return bool ``` check if a key is used (may be recursive)
* ``` set(string key, mixed value [, string documentation ]) : return this ``` associate and remember a key with a value (may be recursive), and may remember a description for the documentation
* ``` delete(string key) : return this ``` forget a key and its value

## Examples

```js
const Container = require('node-containerpattern');
var container = new Container();

// in skeleton, 'typeof' can be = 'string', 'object', 'array', 'boolean', 'integer', 'float', 'number'
// if typeof is 'array' or 'object', and value data is a string, JSON.parse is apply before throw any error

container
  .bindSkeleton("debug", "boolean")
  .bindSkeleton("vat", "float")
  .bindSkeleton("heigth", "integer")

  .set('debug', true) // 'true', 'yes', 'y', '1', 1 or true => get = true, else => get = false
  .set('vat', '5.5').set('vat', 5.5)
  .set('conf', { usr : { login : 'login', pwd : 'pwd' } })
  .set('conf.usr.login', "login2")
  .set('object', new Object());

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

container.clear();
```

## Tests

```bash
$ gulp
```

## License

  [ISC](LICENSE)
