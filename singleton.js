class Singletone {
  constructor() {
    const instance = this.constructor.instance;
    if (instance) {
      return instance;
    }

    this.constructor.instance = this;
  }
}

const s1 = new Singletone();
const s2 = new Singletone();

console.log(s1 === s2);
