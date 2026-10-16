import MinHeap from "./MinHeap";

class Node {
  constructor(value) {
    this.value = value;
    this.isEndOfWord = false;
    this.children = {};
    this.product = null;
  }
}

export default class Trie {
  constructor() {
    this.root = new Node(null);
  }

  insert(name, popularity) {
    let current = this.root;
    for (const character of name.toLowerCase()) {
      if (current.children[character] === undefined) {
        current.children[character] = new Node(character);
      }
      current = current.children[character];
    }
    current.isEndOfWord = true;
    current.product = { name, popularity };
  }

  findPrefix(prefix) {
    let current = this.root;
    for (const character of prefix.toLowerCase()) {
      if (current.children[character] === undefined) return null;
      current = current.children[character];
    }
    return current;
  }

  collectTopK(node, heap, k) {
    if (node.isEndOfWord) {
      heap.push(node.product);
      if (heap.size() > k) heap.pop();
    }
    for (const character in node.children) {
      this.collectTopK(node.children[character], heap, k);
    }
  }

  searchTopK(prefix, k) {
    const node = this.findPrefix(prefix);
    if (!node) return [];
    const heap = new MinHeap();
    this.collectTopK(node, heap, k);
    const result = [];
    while (heap.size() > 0) result.push(heap.pop());
    return result.reverse();
  }
}
