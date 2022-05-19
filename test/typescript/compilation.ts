/// <reference path="../../lib/index.d.ts" />

"use strict";

// deps

  // locals
  import Container = require("../../lib/main.js");

// consts

  const container: Container = new Container();

// module

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

container.forEach((value, key: string): void => {
  console.log("container[" + key + "] = " + value);
});

console.log(container.documentation());

container.clear();
