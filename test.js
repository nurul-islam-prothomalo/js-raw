class Integer {
  constructor(value) {
    this.value = value;
  }

  accept(visitor) {
    visitor.visitValue(this);
  }
}

class BinaryExpression {
  constructor(lhs, rhs) {
    this.lhs = lhs;
    this.rhs = rhs;
  }
}

class AdditionalExpression extends BinaryExpression {
  constructor(lhs, rhs) {
    super(lhs, rhs);
  }

  accept(visitor) {
    visitor.visitAddition(this);
  }
}

class MultipicationExpression extends BinaryExpression {
  constructor(lhs, rhs) {
    super(lhs, rhs);
  }

  accept(visitor) {
    visitor.visitMultiplication(this);
  }
}

class ExpressPrinter {
  constructor() {
    this._buffer = [];
  }

  visitValue(o) {
    this._buffer.push(o.value);
  }

  visitAddition(ae) {
    this._buffer.push("(");
    ae.lhs.accept(this);
    this._buffer.push("+");
    ae.rhs.accept(this);
    this._buffer.push(")");
  }

  visitMultiplication(me) {
    me.lhs.accept(this);
    this._buffer.push("*");
    me.rhs.accept(this);
  }

  toString() {
    return this._buffer.join("");
  }
}

let simple = new AdditionalExpression(new Integer(3), new Integer(4));
const ep = new ExpressPrinter();
ep.visitAddition(simple);
console.log(ep.toString());

const epme = new ExpressPrinter();
const me = new MultipicationExpression(
  new Integer(5),
  new MultipicationExpression(new Integer(2), new Integer(3))
);
epme.visitMultiplication(me);

console.log(epme.toString());
