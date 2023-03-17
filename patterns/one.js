function extend(subClass, superClass) {
  const F = function () {};
  F.prototype = superClass.prototype;
  subClass.prototype = new F();
  subClass.prototype.constructor = subClass;

  subClass.superClass = superClass.prototype;

  if (superClass.prototype.constructor == Object.prototype.constructor) {
    superClass.prototype.constructor = superClass;
  }
}

function Person(name) {
  this.name = name;
}

Person.prototype.getName = function () {
  return this.name;
};

function Author(name, books) {
  Author.superClass.constructor.call(this, name);
  this.books = books;
}

extend(Author, Person);

Author.prototype.getBooks = function () {
  return this.books;
};

Author.prototype.getName = function () {
  const name = Author.superClass.getName.call(this);
  return name + ", Author of " + this.getBooks().join(", ");
};

const author = new Author("Nurul Islam", [
  "Javascript begaineer",
  "Javascript design pattern",
]);

console.log(author.getName());
