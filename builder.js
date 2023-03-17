class Tag {
  static get indentSize() {
    return 2;
  }
  constructor(name = "", text = "") {
    this.name = name;
    this.text = text;
    this.children = [];
  }

  toStringImpl(indent) {
    const row = [];
    const space = " ".repeat(indent * Tag.indentSize);
    row.push(`${space}<${this.name}>\n`);
    if (this.text.length > 0) {
      row.push(" ".repeat(Tag.indentSize * (indent + 1)));
      row.push(this.text);
      row.push("\n");
    }

    for (const child of this.children) {
      row.push(child.toStringImpl(indent + 1));
    }

    row.push(`${space}</${this.name}>\n`);
    return row.join("");
  }

  toString() {
    return this.toStringImpl(0);
  }
}

class HtmlBuilder {
  constructor(rootName) {
    this.root = new Tag(rootName);
    this.rootName = rootName;
  }

  addChild(childName, childText) {
    const child = new Tag(childName, childText);
    this.root.children.push(child);
  }

  addChildFluent(childName, childText) {
    const child = new Tag(childName, childText);
    this.root.children.push(child);
    return this;
  }

  clear() {
    this.root = new Tag(this.rootName);
  }

  toString() {
    return this.root.toString();
  }

  build() {
    return this.root;
  }
}

const words = ["Hello", "world"];

const builder = new HtmlBuilder("ul");

for (let word of words) builder.addChild("li", word);
console.log(builder.toString());

builder.clear();

builder
  .addChildFluent("li", "Nurul")
  .addChildFluent("li", "Islam")
  .addChildFluent("li", "Tipu");

console.log(builder.toString());
