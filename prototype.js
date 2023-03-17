class Address {
  constructor(streetAdress, city, country) {
    this.streetAdress = streetAdress;
    this.city = city;
    this.country = country;
  }

  deepCopy() {
    return new Address(this.streetAdress, this.city, this.country);
  }
  toString() {
    return `Address ${this.streetAdress}, ${this.city}, ${this.country}`;
  }
}

class Person {
  constructor(name, address) {
    this.name = name;
    this.address = address;
  }

  deepCopy() {
    return new Person(this.name, this.address.deepCopy());
  }

  toString() {
    return `${this.name} lives at ${this.address}`;
  }
}

const john = new Person(
  "Nurul Islam",
  new Address("123 Bhola sadar", "Bhola", "Bangladesh")
);

const jane = john.deepCopy();

jane.name = "Tipu";
jane.address.streetAdress = "345 Tejturi bazar";
jane.address.city = "Dhaka";

console.log(john.toString());
console.log(jane.toString());
