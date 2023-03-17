class Person {
  constructor() {
    // address
    this.streetAddress = this.postCode = this.city = "";

    // employee
    this.companyName = this.position = "";
    this.annualIncome = 0;
  }

  toString() {
    return `Person lives at ${this.streetAddress}, ${this.city}, ${this.postCode} 
    and works at ${this.companyName}, as a ${this.position} earning ${this.annualIncome}`;
  }
}

class PersonBuilder {
  constructor(person = new Person()) {
    this.person = person;
  }

  get lives() {
    return new PersonAddressBuilder(this.person);
  }

  get works() {
    return new PersonJobBuilder(this.person);
  }

  build() {
    return this.person;
  }
}

class PersonJobBuilder extends PersonBuilder {
  constructor(person) {
    super(person);
    this.person = person;
  }

  at(companyName) {
    this.person.companyName = companyName;
    return this;
  }

  asA(position) {
    this.person.position = position;
    return this;
  }

  earning(annualIncome) {
    this.person.annualIncome = annualIncome;
    return this;
  }
}

class PersonAddressBuilder extends PersonBuilder {
  constructor(person) {
    super(person);
  }
  at(streetAddress) {
    this.person.streetAddress = streetAddress;
    return this;
  }

  withPostCode(postCode) {
    this.person.postCode = postCode;
    return this;
  }

  in(city) {
    this.person.city = city;
    return this;
  }
}

const pb = new PersonBuilder();
const person = pb.lives
  .at("123 London Road")
  .in("London")
  .withPostCode("SW12BC")
  .works.at("Prothom alo")
  .asA("Web developer")
  .earning(400000)
  .build();

console.log(person.toString());
