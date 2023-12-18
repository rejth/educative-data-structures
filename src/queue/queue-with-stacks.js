class Queue {
  #stack;

  constructor() {
    this.values = [];
    this.#stack = [];
  }

  get size() {
    return this.values.length;
  }

  isEmpty() {
    return this.size === 0;
  }

  enqueue(value) {
    this.values.push(value);
  }

  dequeue() {
    if (this.isEmpty()) return undefined;

    while (!this.isEmpty()) {
      this.#stack.push(this.values.pop());
    }

    const first = this.#stack.pop();

    while (this.#stack.length > 0) {
      this.values.push(this.#stack.pop());
    }

    return first;
  }
}

const queue = new Queue();
queue.enqueue(5);
queue.enqueue(2);
queue.enqueue(4);
queue.enqueue(1);
queue.enqueue(3);
queue.enqueue(9);

console.log(queue.dequeue());
console.log(queue.dequeue());
console.log(queue.dequeue());

console.log(queue.values);
