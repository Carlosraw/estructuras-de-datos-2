export class Queue {
  constructor() {
    this.items = [];
  }

  enqueue(item) {
    this.items.push(item);
  }

  dequeue() {
    return this.items.length > 0 ? this.items.shift() : null;
  }

  peek() {
    return this.items.length > 0 ? this.items[0] : null;
  }

  size() {
    return this.items.length;
  }

  isEmpty() {
    return this.items.length === 0;
  }

  print() {
    this.items.forEach((item) => console.log(item));
  }

  sortByArrival() {
    this.items.sort((a, b) => a.arrivalDate - b.arrivalDate);
  }

  toArray() {
    return this.items.slice();
  }
}

const THREE_HOURS = 3 * 60 * 60 * 1000;
let nextId = 1;

export function createPerson(name, withdrawal) {
  return {
    id: nextId++,
    name,
    withdrawal: Number(withdrawal),
    arrivalDate: new Date(Date.now() - Math.random() * THREE_HOURS),
  };
}

export function buildAtmQueue() {
  const queue = new Queue();
  queue.enqueue(createPerson("Ana Gómez", 200000));
  queue.enqueue(createPerson("Luis Pérez", 50000));
  queue.enqueue(createPerson("María Rodríguez", 350000));
  queue.enqueue(createPerson("Carlos Ruiz", 120000));
  queue.sortByArrival();
  return queue;
}