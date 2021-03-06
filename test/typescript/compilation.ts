/// <reference path="../../lib/index.d.ts" />

import Container = require("../../lib/main.js");
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