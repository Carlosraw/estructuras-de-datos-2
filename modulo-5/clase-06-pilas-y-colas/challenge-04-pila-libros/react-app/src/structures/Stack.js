export class Stack {
  constructor() {
    this.items = [];
  }

  push(value) {
    this.items.push(value);
  }

  pop() {
    return this.items.length > 0 ? this.items.pop() : null;
  }

  peek() {
    return this.items.length > 0 ? this.items[this.items.length - 1] : null;
  }

  isEmpty() {
    return this.items.length === 0;
  }

  size() {
    return this.items.length;
  }

  print() {
    this.items.slice().reverse().forEach((item) => console.log(item));
  }

  toArray() {
    return this.items.slice().reverse();
  }
}

export function buildBooksStack() {
  const stack = new Stack();
  stack.push({ name: "Cien años de soledad", isbn: "978-0-30-747472-8", author: "Gabriel García Márquez", editorial: "Vintage Español" });
  stack.push({ name: "Clean Code", isbn: "978-0-13-235088-4", author: "Robert C. Martin", editorial: "Prentice Hall" });
  stack.push({ name: "El Principito", isbn: "978-0-15-601219-5", author: "Antoine de Saint-Exupéry", editorial: "Harcourt" });
  return stack;
}