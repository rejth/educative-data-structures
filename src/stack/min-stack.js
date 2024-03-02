class MinStack {
  #stack;
  #comparator;

  constructor(comparator = (a, b) => a - b) {
    this.values = [];
    this.#stack = [];
    this.#comparator = comparator;
  }

  get stack() {
    return this.#stack;
  }

  get length() {
    return this.values.length;
  }

  get peak() {
    return this.#stack[this.#stack.length - 1];
  }

  pop() {
    this.#stack.pop();
    return this.values.pop();
  }

  push(value) {
    this.values.push(value);

    if (this.#stack.length > 0 && this.#comparator(this.peak, value) < 0) {
      this.#stack.push(this.peak);
    } else {
      this.#stack.push(value);
    }
  }
}

const stack = new MinStack();
stack.push(5);
stack.push(2);
stack.push(4);
stack.push(1);
stack.push(3);
stack.push(9);

console.log('stack ', stack.stack);
console.log('values ', stack.values);

console.log('minimum value: ', stack.peak); // 1

stack.pop(); // 9
stack.pop(); // 3
stack.pop(); // 1

console.log('minimum value: ', stack.peak); // 2

stack.pop(); // 4

console.log('minimum value: ', stack.peak); // 2
