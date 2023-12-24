/*
 * Min heaps follow the min heap property meaning the key at the parent node is always lower than the keys at the child nodes.
 * Heaps can be implemented using arrays.
 *
 * The primary purpose of heaps is to return the smallest or largest element.
 * This is because the time complexity of getting the minimum/maximum value from a min/max heap is O(1).
 * So heaps are used to design Priority Queues primarily.
 *
 * In fact, the only key condition that a heap follows is that the largest or smallest element is always placed at the top (root node) depending on what type of heap we are using (Min/Max).
 */

export class MinHeap {
  #heap;
  #lastIndex;

  constructor() {
    this.#heap = [];
    this.#lastIndex = -1;
  }

  get heap() {
    return this.#heap;
  }

  push(value) {
    this.#heap[++this.#lastIndex] = value;

    if (this.#lastIndex > 0) {
      this.#liftChildUp();
    }

    return this;
  }

  pop() {
    if (this.heap.length === 0) return undefined;
    const minRoot = this.heap[0];

    if (this.#lastIndex >= 0) {
      this.heap[0] = this.heap[this.#lastIndex];
      this.heap.pop();
      this.#lastIndex--;

      if (this.#lastIndex > -1) {
        this.#liftChildDown();
      }
    }

    return minRoot;
  }

  // return first K the smallest elements
  // O(k * log(n))
  findKSmallest(k) {
    const kSmallest = [];

    for (let i = 0; i < k; i++) {
      kSmallest.push(this.pop());
    }

    return kSmallest;
  }

  // to restore the heap property going up from a last node to the root.
  #liftChildUp() {
    let cursor = this.#lastIndex;
    const lastChild = this.heap[cursor];

    // go up in a bottom-up manner and repeat until we reach the root node at index 0
    while (cursor > 0) {
      const parentIndex = this.#getLastParentNodeIndex(cursor);
      const parentNode = this.heap[parentIndex];

      // if the min heap property is satisfied, we break the loop
      if (parentNode <= lastChild) break;

      // else swap nodes if child value is smaller that parent value, i.e. move parent down
      this.heap[cursor] = parentNode;
      cursor = parentIndex;
    }

    this.heap[cursor] = lastChild;
  }

  // to restore the heap property starting from a root node to the leaves
  #liftChildDown() {
    let cursor = 0;
    let leftChildIndex = this.#getLeftChildIndex(cursor);
    let rightChildIndex = this.#getRightChildIndex(cursor);

    const root = this.heap[cursor];

    // go down in an up-bottom manner and repeat until we reach the last leaf
    while (leftChildIndex <= this.#lastIndex) {
      const leftChild = this.heap[leftChildIndex];
      const rightChild = this.heap[rightChildIndex];

      let smallestChildIndex;

      // when we reach a node with only one leaf child node,
      // the right child index will be smaller than the last index according to the 2 * index + 2
      // so in order to not get undefined, we just take left child index
      if (rightChildIndex > this.#lastIndex) {
        smallestChildIndex = leftChildIndex;
      } else {
        // compare children to find the largest child
        if (leftChild < rightChild) {
          smallestChildIndex = leftChildIndex;
        } else {
          smallestChildIndex = rightChildIndex;
        }
      }

      const smallestChild = this.heap[smallestChildIndex];

      // if the min heap property is satisfied, we break the loop
      if (root <= smallestChild) break;

      // else we swap nodes values and set cursor into the largest child index
      // i.e. move the largest node up, the smallest - down
      this.heap[cursor] = smallestChild;
      cursor = smallestChildIndex;

      // reassign left and right child indices according to the new cursor
      leftChildIndex = this.#getLeftChildIndex(cursor);
      rightChildIndex = this.#getRightChildIndex(cursor);
    }

    this.heap[cursor] = root;
  }

  #getLastParentNodeIndex(lastIndex) {
    return Math.floor((lastIndex - 1) / 2);
  }

  #getLeftChildIndex(index) {
    return 2 * index + 1;
  }

  #getRightChildIndex(index) {
    return 2 * index + 2;
  }
}

const minHeap = new MinHeap();
minHeap.push(20);
minHeap.push(8);
minHeap.push(15);
minHeap.push(2);
minHeap.push(5);
minHeap.push(1);

console.log(minHeap.heap);

console.log(minHeap.pop()); // 1
console.log(minHeap.pop()); // 2
console.log(minHeap.pop()); // 5

console.log(minHeap.findKSmallest(3));
