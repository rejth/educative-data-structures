import { DynamicArray } from '../array/DynamicArray.js';

export class Bucket extends DynamicArray {
  constructor(capacity) {
    super(capacity);
  }

  find(searchKey) {
    for (const [key, value] of super.values()) {
      if (key === searchKey) return value;
    }
    return undefined;
  }

  *entries() {
    yield* super.values();
  }

  *keys() {
    let current = this.first;
    while (current) {
      for (const value of current.data) {
        if (value) yield value[0];
      }
      current = current.next;
    }
  }

  *values() {
    let current = this.first;
    while (current) {
      for (const value of current.data) {
        if (value) yield value[1];
      }
      current = current.next;
    }
  }
}
