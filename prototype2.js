class Address {
  constructor(streetAdress, city, country) {
    this.streetAdress = streetAdress;
    this.city = city;
    this.country = country;
  }

  toString() {
    return `Address ${this.streetAdress}, ${this.city}, ${this.country}`;
  }
}

class Employee {
  constructor(name, address) {
    this.name = name;
    this.address = address;
  }

  toString() {
    return `${this.name} work at ${this.address}`;
  }

  greet() {
    console.log(
      `Hi, my name is ${this.name}, ` + `I work at ${this.address.toString()}` //!
    );
  }
}

class Person {
  constructor(name, address) {
    this.name = name;
    this.address = address;
  }

  toString() {
    return `${this.name} lives at ${this.address}`;
  }

  greet() {
    console.log(
      `Hi, my name is ${this.name}` + `I live at ${this.address.toString()}`
    );
  }
}

class Serialize {
  constructor(types) {
    this.types = types;
  }

  markRecursive(object) {
    const idx = this.types.findIndex(
      (type) => type.name === object.constructor.name
    );

    if (idx !== -1) {
      object["typeIndex"] = idx;
      for (let key in object) {
        if (object.hasOwnProperty(key) && object[key] != null) {
          this.markRecursive(object[key]);
        }
      }
    }
  }

  reconstructRecursive(object) {
    if (object.hasOwnProperty("typeIndex")) {
      const type = this.types[object.typeIndex];
      const obj = new type();
      for (let key in object) {
        if (object.hasOwnProperty(key) && object[key] != null) {
          obj[key] = this.reconstructRecursive(object[key]);
        }
      }
      delete object.typeIndex;
      return obj;
    }
    return object;
  }

  clone(object) {
    this.markRecursive(object);
    const copy = JSON.parse(JSON.stringify(object));
    return this.reconstructRecursive(copy);
  }
}

class EmployeFactory {
  static _newEmployee(proto, name, suite) {
    let copy = EmployeFactory.serializer.clone(proto);
    copy.name = name;
    copy.address.suite = suite;

    return copy;
  }

  static newMainOfficeOfficeEmployee(name, suite) {
    return this._newEmployee(EmployeFactory.main, name, suite);
  }

  static newAuxOfficeEmployee(name, suite) {
    return this._newEmployee(EmployeFactory.aux, name, suite);
  }
}

EmployeFactory.serializer = new Serialize([Employee, Address]);
EmployeFactory.main = new Employee(
  null,
  new Address(null, "123 Tejgaon", "Bangladesh")
);
EmployeFactory.aux = new Employee(
  null,
  new Address(null, "456 Farmgate", "Bangladesh")
);

const john = EmployeFactory.newMainOfficeOfficeEmployee("John", 4321);
const jane = EmployeFactory.newAuxOfficeEmployee("Jane", 222);

console.log(john.toString());
console.log(jane.toString());
