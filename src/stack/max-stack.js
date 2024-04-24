/*
 * Heap is a Complete Binary Tree, where each level contains the maximum number of nodes, except possibly the last layer.
 *
 * Max heaps follow the max heap property meaning the key at the parent node is always greater than the keys at the child nodes.
 * Min heaps follow the min heap property meaning the key at the parent node is always lower than the keys at the child nodes.
 *
 * The primary purpose of heaps is to return the smallest or largest element.
 * This is because the time complexity of getting the minimum/maximum value from a min/max heap is O(1).
 * So heaps are used to design Priority Queues primarily.
 *
 * Heaps can be implemented using arrays:
 * parent index = i
 * left child index = 2 * i + 1 => parent = Math.floor(i - 1 / 2)
 * right child index = 2 * i + 2 => parent = Math.floor(i - 1 / 2)
 */

export class Heap {
  heap;
  #comparator;

  constructor(comparator) {
    this.heap = [];
    this.#comparator = comparator;
  }

  get length() {
    return this.heap.length;
  }

  peekMax() {
    if (this.length === 0) return undefined;
    return this.heap[0];
  }

  last() {
    if (this.length === 0) return undefined;
    return this.heap[this.length - 1];
  }

  // Push a new element and restore Heap property
  // Time complexity - O(log(n))
  push(element) {
    this.heap.push(element);

    // Now we have a new element in the heap, and we need to restore heap property
    this.#liftChildUp();
    return this;
  }

  // Remove and return the root element, then restore Heap property
  // Time complexity - O(log(n))
  popMax() {
    if (this.length === 0) return undefined;

    // Swap the root node with last node
    const lastIndex = this.length - 1;
    this.#swapNodes(0, lastIndex);

    // Remove the root node by popping the last item out of the array (because of swapping)
    const root = this.heap.pop();
    // Now we have a new root and we need to restore heap property
    this.#liftChildDown();

    return root;
  }

  // Time complexity - O(n)
  remove(cb) {
    const index = this.heap.findIndex(cb);
    if (index > -1) {
      this.heap.splice(index, 1);
      this.#liftChildDown();
    }
    return index;
  }

  updateIndices(startIndex) {
    for (let i = startIndex; i < this.length; i++) {
      if (this.heap[i].index > startIndex) {
        this.heap[i].index--;
      }
    }
  }

  #swapNodes(a, b) {
    [this.heap[a], this.heap[b]] = [this.heap[b], this.heap[a]];
  }

  // To restore the heap property going up from a last node to the root
  #liftChildUp() {
    /*
     * 1. Compare the last pushed node with its parent:
     * a. If the parent is less/great than the last node, then heap is stable
     * b. Else, swap the last node with the parent
     * 2. Repeat step 1 until root is reached or the heap property is established.
     */
    let cursor = this.length - 1;

    while (cursor > 0) {
      const currentNode = this.heap[cursor];
      const parentIndex = this.#getParentIndex(cursor);
      const parentNode = this.heap[parentIndex];

      /*
       * Heap property is established:
       * - for Min Heap - parent < current
       * - for Max Heap - parent > current
       */
      const heapPropertyIsEstablished = this.#comparator(parentNode, currentNode) < 0;
      if (heapPropertyIsEstablished) {
        break;
      }

      this.#swapNodes(parentIndex, cursor);
      cursor = parentIndex;
    }
  }

  // To restore the heap property going down from the root to the last node
  #liftChildDown() {
    /*
     * 1. Compare the new root node's value with its children:
     * a. If the root is less/great than both of its children's values, then heap is stable
     * b. Else, swap the root with the smaller/larger child value
     * 2. Repeat step 1 until the last child is reached or the heap property is established.
     */
    let cursor = 0;

    while (this.#getLeftChildIndex(cursor) < this.length) {
      let leftIndex = this.#getLeftChildIndex(cursor);
      let rightIndex = this.#getRightChildIndex(cursor);

      const leftNode = this.heap[leftIndex];
      const rightNode = this.heap[rightIndex];
      const currentNode = this.heap[cursor];

      /*
       * Determine the smallest/largest child index according to sorting condition:
       * - for Min Heap - right < left
       * - for Max Heap - right > left
       */
      const childIndex = rightIndex < this.length && this.#comparator(rightNode, leftNode) < 0 ? rightIndex : leftIndex;

      /*
       * Heap property is established:
       * - for Min Heap - currentNode < minChildNode
       * - for Max Heap - currentNode > maxChildNode
       */
      const heapPropertyIsEstablished = this.#comparator(this.heap[childIndex], currentNode) > 0;

      if (heapPropertyIsEstablished) {
        break;
      }

      this.#swapNodes(cursor, childIndex);
      cursor = childIndex;
    }
  }

  #getParentIndex(childIndex) {
    return Math.floor(childIndex - 1 / 2);
  }

  #getLeftChildIndex(parentIndex) {
    return 2 * parentIndex + 1;
  }

  #getRightChildIndex(parentIndex) {
    return 2 * parentIndex + 2;
  }
}

// FIXME
var MaxStack = function () {
  this.stack = [];
  this.maxHeap = new Heap((a, b) => b.value - a.value);
};

/**
 * @param {number} x
 * @return {void}
 */
MaxStack.prototype.push = function (x) {
  this.stack.push(x);
  this.maxHeap.push({ value: x, index: this.stack.length - 1 });
};

/**
 * @return {number}
 */
MaxStack.prototype.pop = function () {
  const value = this.stack.pop();
  const index = this.maxHeap.remove((node) => node.value === value);
  this.maxHeap.updateIndices(index);
  return value;
};

/**
 * @return {number}
 */
MaxStack.prototype.top = function () {
  return this.stack[this.stack.length - 1];
};

/**
 * @return {number}
 */
MaxStack.prototype.peekMax = function () {
  return this.maxHeap.peekMax().value;
};

/**
 * @return {number}
 */
MaxStack.prototype.popMax = function () {
  const max = this.maxHeap.popMax();
  this.stack.splice(max.index, 1);
  this.maxHeap.updateIndices(max.index);
  return max.value;
};

// [[],[-81],[-41],[38],[18],[],[],[-39],[],[],[],[],[],[56]]
var obj = new MaxStack();
obj.push(-81);
obj.push(-41);
obj.push(38);
obj.push(18);

var param_3 = obj.top();
console.log('🚀 ~ param_3:', param_3);
var param_4 = obj.top();
console.log('🚀 ~ param_4:', param_4);

console.log('heap: ', obj.maxHeap);

obj.push(-39);
var param_5 = obj.pop();
console.log('🚀 ~ param_5:', param_5);
console.log('heap: ', obj.maxHeap);

var param_6 = obj.popMax();
console.log('🚀 ~ param_6:', param_6);
console.log('heap: ', obj.maxHeap);

var param_7 = obj.popMax();
console.log('🚀 ~ param_7:', param_7);
console.log('stack: ', obj.stack);
console.log('heap: ', obj.maxHeap);

var param_8 = obj.peekMax();
console.log('🚀 ~ param_8:', param_8);

console.log('stack: ', obj.stack);
console.log('heap: ', obj.maxHeap);

var param_9 = obj.top();
console.log('🚀 ~ param_9:', param_9);

obj.push(56);
