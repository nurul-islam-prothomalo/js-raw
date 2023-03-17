class Point {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  static get factory() {
    return new PointFactory();
  }
}

class PointFactory {
  newCartesianPoint(x, y) {
    return new Point(x, y);
  }

  newPolarPoint(roh, theta) {
    return new Point(roh * Math.cos(theta), roh * Math.sin(theta));
  }
}

const p = Point.factory.newCartesianPoint(3, 4);
console.log(p);
const p1 = Point.factory.newPolarPoint(4, 4);
console.log(p1);
