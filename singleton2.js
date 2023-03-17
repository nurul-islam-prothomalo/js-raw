class ChiefExecutiveOffice {
  get name() {
    return ChiefExecutiveOffice._name;
  }

  set name(value) {
    ChiefExecutiveOffice._name = value;
  }

  get age() {
    return ChiefExecutiveOffice._age;
  }

  set age(value) {
    ChiefExecutiveOffice._age = value;
  }

  toString() {
    return `CEO's name if ${this.name} and he is ${this.age} years old.`;
  }
}

ChiefExecutiveOffice._name = undefined;
ChiefExecutiveOffice._age = undefined;

const ceo = new ChiefExecutiveOffice();
ceo.name = "Nurul Islam";
ceo.age = 29;

console.log(ceo.toString());

const ceo2 = new ChiefExecutiveOffice();
ceo2.name = "Arpa khan";
ceo2.age = 24;

console.log(ceo.toString(), ceo2.toString());
