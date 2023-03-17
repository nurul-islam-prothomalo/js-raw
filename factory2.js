const readline = require("readline");
let rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

class HotDrink {
  consume() {}
}

class Tea extends HotDrink {
  consume() {
    console.log("This tea is nice with leamon!");
  }
}

class Coffe extends HotDrink {
  consume() {
    console.log("This coffe is delicious!");
  }
}

class HotDrinkFactory {
  prepare(amount) {
    /*abstruct*/
  }
}

class TeaFactory extends HotDrinkFactory {
  prepare(amount) {
    console.log(`Put in tea bag, boil water, pour ${amount}ml.`);
    return new Tea();
  }
}

class CoffeFactory extends HotDrinkFactory {
  prepare(amount) {
    console.log(`Grind some beans, boil water, pour ${amount}ml.`);
    return new Coffe();
  }
}

const AvailableDrink = Object.freeze({
  tea: TeaFactory,
  coffe: CoffeFactory,
});

class HotDrinkMachine {
  constructor() {
    this.factories = {};
    for (let drink in AvailableDrink) {
      this.factories[drink] = new AvailableDrink[drink]();
    }
  }

  makeType(type) {
    switch (type) {
      case "tea":
        return new TeaFactory().prepare(200);
      case "coffe":
        return new CoffeFactory().prepare(50);
      default:
        throw new Error(`${type} don't know hot to make.`);
    }
  }

  interact(consume) {
    rl.question(
      "Please specify drink and amount (e.g., tea 50): ",
      (answer) => {
        const parts = answer.split(" ");
        const name = parts[0];
        const amount = parseInt(parts[1]);
        const d = this.factories[name].prepare(amount);
        rl.close();
        consume(d);
      }
    );
  }
}

const machine = new HotDrinkMachine();
machine.interact((drink) => {
  drink.consume();
});
