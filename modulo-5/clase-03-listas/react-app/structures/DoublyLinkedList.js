export class DNode {
  constructor(value) {
    this.value = value;
    this.next = null;
    this.prev = null;
  }
}

export class DoublyLinkedList {
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

  size() {
    return this.length;
  }
}

export function buildHistory() {
  const history = new DoublyLinkedList();
  history.append({ title: "inbox", url: "mail.acme.co/inbox" });
  history.append({ title: "presupuesto Q3", url: "sheets.acme.co/q3-budget" });
  history.append({ title: "módulo 5 - campus", url: "campus.uao.edu.co/m5" });
  history.append({ title: "linked list - MDN", url: "developer.mozilla.org/linked-list" });
  return history;
}
