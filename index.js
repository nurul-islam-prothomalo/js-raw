const Person = {
  name: "default name",
  getName: function () {
    return this.name;
  },
};

function clone(object) {
  function F() {}
  F.prototype = object;
  return new F();
}

const clonePerson = clone(Person);

console.log(Person === clonePerson);
console.log(clonePerson);
