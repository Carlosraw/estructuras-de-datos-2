class Node {
  constructor(value) {
    this.value = value;
    this.next = null;
  }
}

class LinkedList {
  constructor() {
    this.head = null;
    this.tail = null;
    this.length = 0;
  }

  append(value) {
    const newNode = new Node(value);

    if (!this.head) {
      this.head = newNode;
    } else {
      this.tail.next = newNode;
    }

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

  remove(value, current = this.head) {
    if (!this.head) return null;

    if (this.head.value === value) {
      this.head = this.head.next;
      if (!this.head) this.tail = null;
      this.length--;
      return;
    }

    while (current.next && current.next.value !== value) {
      current = current.next;
    }

    if (current.next) {
      current.next = current.next.next;
      if (!current.next) this.tail = current;
      this.length--;
    }
  }

  print() {
    let current = this.head;
    let result = "";
    while (current) {
      result += `${current.value.title} -> `;
      current = current.next;
    }
    console.log(result + "null");
  }
}

// Datos simulados 
const playlist = new LinkedList();

playlist.append({ title: "Nightdrive", artist: "Volta Cruz" });
playlist.append({ title: "Paper Static", artist: "Mono Yield" });
playlist.append({ title: "Slow Tide", artist: "Reyes & Oberlin" });
playlist.append({ title: "Copper Room", artist: "Volta Cruz" });

// Reproducir la lista en orden, de head a tail 
function play(list) {
  let current = list.head;
  while (current) {
    console.log(`Reproduciendo: ${current.value.title} - ${current.value.artist}`);
    current = current.next;
  }
}

play(playlist);
playlist.print();

module.exports = { Node, LinkedList, playlist };
