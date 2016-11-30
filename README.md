# node-containerpattern
A 'Container pattern' object for a clean global use of data.
Basicaly, it extends Map object with lot of controls, recursive methods and documentation


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

  * ``` object documentations ``` used to save documentation by data's key
  * ``` object limits ``` used to limit data's values possibilities
  * ``` string recursionSeparator ``` used to parse recursive keys (default : '.')
  * ``` object skeletons ``` used to force data type

  -- Constructor --

  * ``` constructor([ string recursionSeparator = "." ]) ```

  -- Methods --

  * ``` bindSkeleton(string key, string skeleton) : return this ``` skeleton must be "string", "email", "object", "array", "boolean", "integer", "float" or "number"
  * ``` clear() : return this ``` clearData & clearDocumentations & clearLimits & clearSkeletons
  * ``` clearData() : return this ``` forget all the keys and there values and documentations (=> Map.clear)
  * ``` clearDocumentations() : return this ``` forget all the skeletons
  * ``` clearLimits() : return this ``` forget all the limits
  * ``` clearSkeletons() : return this ``` forget all the skeletons
  * ``` delete(string key) : return this ``` forget a key and its value
  * ``` document(string key, string documentation) : return this ``` attach a documentation on the data. only visible if "set" method is applied with this key.
  * ``` documentation() : return JSON object ``` generate a documentation for all the stored data
  * ``` get(string key) : return mixed ``` return the value in association with this key (may be recursive)
  * ``` has(string key) : return bool ``` check if a key is used (may be recursive)
  * ``` limit(string key, array limit) : return this ``` associate a key with a limit
  * ``` set(string key, mixed value) : return this ``` associate and remember a key with a value (may be recursive)

  -- notes --

  * if the skeleton is an 'array' or an 'object', and value data is a string, JSON.parse is apply before throw any error
  * if the skeleton is an 'email', value must be a string. it can be empty, but must be a valid address if not

## Examples

```js
const Container = require('node-containerpattern');
var container = new Container();

container
  .bindSkeleton("contact", "email").document("contact", "Contact address")
  .bindSkeleton("debug", "boolean").document("debug", "This is the debug module")
  .bindSkeleton("vat", "float")
  .bindSkeleton("heigth", "integer")

  .set('contact', "myaddress@provider.com")
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

container.forEach((value, key) => {
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
