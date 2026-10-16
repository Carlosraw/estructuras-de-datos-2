class Node {
  constructor(value) {
    this.value = value;
    this.isEndOfWord = false;
    this.children = {};
    this.product = null;
  }
}

class MinHeap {
  constructor() {
    this.heap = [];
  }

  push(item) {
    this.heap.push(item);
    this.percolateUp();
  }

  pop() {
    if (this.heap.length === 0) return undefined;
    const n = this.heap.length;
    this.swap(0, n - 1);
    const min = this.heap.pop();
    this.percolateDown(0);
    return min;
  }

  peek() {
    return this.heap[0];
  }

  percolateDown(index) {
    let curr = index;
    while (2 * curr + 1 < this.heap.length) {
      const left = 2 * curr + 1;
      const right = 2 * curr + 2;
      const minChild =
        right < this.heap.length &&
        this.heap[right].popularity < this.heap[left].popularity
          ? right
          : left;
      if (this.heap[minChild].popularity < this.heap[curr].popularity) {
        this.swap(curr, minChild);
        curr = minChild;
      } else {
        break;
      }
    }
  }

  percolateUp() {
    let curr = this.heap.length - 1;
    while (curr > 0) {
      const parent = Math.floor((curr - 1) / 2);
      if (this.heap[curr].popularity < this.heap[parent].popularity) {
        this.swap(curr, parent);
        curr = parent;
      } else {
        break;
      }
    }
  }

  swap(i, j) {
    [this.heap[i], this.heap[j]] = [this.heap[j], this.heap[i]];
  }

  size() {
    return this.heap.length;
  }

  toArray() {
    return [...this.heap];
  }
}

export class Trie {
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

  search(word) {
    let current = this.root;
    for (const character of word.toLowerCase()) {
      if (current.children[character] === undefined) return false;
      current = current.children[character];
    }
    return current.isEndOfWord;
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

const trie = new Trie();
trie.insert("air max", 90);
trie.insert("air force", 95);
trie.insert("air jordan", 85);
trie.insert("adidas boost", 80);
trie.insert("adidas ultraboost", 88);
trie.insert("nike pegasus", 70);

console.log('searchTopK("air", 2):', trie.searchTopK("air", 2));
console.log('searchTopK("air", 5):', trie.searchTopK("air", 5));
console.log('searchTopK("ad", 1):', trie.searchTopK("ad", 1));
console.log('searchTopK("zapatos", 3):', trie.searchTopK("zapatos", 3));
console.log('search("air max"):', trie.search("air max"));
console.log('search("air"):', trie.search("air"));
