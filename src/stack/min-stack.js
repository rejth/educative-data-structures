class MinStack {
  #minStack;

  constructor() {
    this.values = [];
    this.#minStack = [];
  }

  pop() {
    this.#minStack.pop();
    return this.values.pop();
  }

  push(value) {
    this.values.push(value);
    const top = this.#minStack[this.#minStack.length - 1];
    if (value > top && this.#minStack.length > 0) {
      this.#minStack.push(top);
    } else {
      this.#minStack.push(value);
    }
  }

  min() {
    return this.#minStack[this.#minStack.length - 1];
  }
}

const stack = new MinStack();
stack.push(5);
stack.push(2);
stack.push(4);
stack.push(1);
stack.push(3);
stack.push(9);

console.log('minimum value: ', stack.min());

stack.pop();
stack.pop();
stack.pop();

console.log('minimum value: ', stack.min());
