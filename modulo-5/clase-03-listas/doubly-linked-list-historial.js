class DNode {
  constructor(value) {
    this.value = value;
    this.next = null;
    this.prev = null;
  }
}

class DoublyLinkedList {
  constructor() {
    this.head = null;
    this.tail = null;
    this.length = 0;
  }

  append(value) {
    const newNode = new DNode(value);

    if (!this.head) {
      this.head = newNode;
      this.tail = newNode;
      this.length++;
      return this;
    }

    this.tail.next = newNode;
    newNode.prev = this.tail;
    this.tail = newNode;
    this.length++;
    return this;
  }

  peek(value, current = this.head) {
    while (current) {
      if (current.value === value) return current;
      current = current.next;
    }
    return null;
  }

  size() {
    return this.length;
  }

  remove(value) {
    if (!this.head) return null;
    let current = this.head;

    while (current) {
      if (current.value === value) {
        if (current === this.head) {
          this.head = current.next;
          if (this.head) this.head.prev = null;
        }
        if (current === this.tail) {
          this.tail = current.prev;
          if (this.tail) this.tail.next = null;
        }
        if (current.prev) current.prev.next = current.next;
        if (current.next) current.next.prev = current.prev;

        this.length--;
        return current;
      }
      current = current.next;
    }
    return null;
  }

  print() {
    let current = this.head;
    let result = "";
    while (current) {
      result += `${current.value.url} <-> `;
      current = current.next;
    }
    console.log(result + "null");
  }
}

//Datos falsos (simulando historial de navegación)
const history = new DoublyLinkedList();

history.append({ title: "inbox", url: "mail.acme.co/inbox" });
history.append({ title: "presupuesto Q3", url: "sheets.acme.co/q3-budget" });
history.append({ title: "módulo 5 - campus", url: "campus.uao.edu.co/m5" });
history.append({ title: "linked list - MDN", url: "developer.mozilla.org/linked-list" });

//Navegador simple: mantiene un puntero "current" sobre la lista
class NavigatorSimulator {
  constructor(list) {
    this.list = list;
    this.current = list.head;
  }

  goBack() {
    if (this.current && this.current.prev) {
      this.current = this.current.prev;
    }
    return this.current.value;
  }

  goForward() {
    if (this.current && this.current.next) {
      this.current = this.current.next;
    }
    return this.current.value;
  }
}

const navigator = new NavigatorSimulator(history);
navigator.goForward();
navigator.goForward();
console.log("Página actual:", navigator.current.value.url);
console.log("Atrás:", navigator.goBack().url);
console.log("Adelante:", navigator.goForward().url);

history.print();

module.exports = { DNode, DoublyLinkedList, NavigatorSimulator, history };
