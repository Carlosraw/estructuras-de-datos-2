export class Node {
  constructor(value) {
    this.value = value;
    this.next = null;
  }
}

export class LinkedList {
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

  size() {
    return this.length;
  }
}

export function buildPlaylist() {
  const playlist = new LinkedList();
  playlist.append({ title: "Nightdrive", artist: "Volta Cruz" });
  playlist.append({ title: "Paper Static", artist: "Mono Yield" });
  playlist.append({ title: "Slow Tide", artist: "Reyes & Oberlin" });
  playlist.append({ title: "Copper Room", artist: "Volta Cruz" });
  return playlist;
}
