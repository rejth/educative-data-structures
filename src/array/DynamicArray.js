class ArrayNode {
  constructor(data) {
    this.data = data;
    this.next = null;
    this.prev = null;
  }
}

export class DynamicArray {
  constructor(capacity) {
    this.capacity = capacity;
    this.length = 0;
    this.first = null;
    this.last = null;
  }

  push(data) {
    if (this.length === 0) {
      const array = new Array(this.capacity).fill(undefined);
      this.first = new ArrayNode(array);
      this.first.data[0] = data;
      this.last = this.first;
    } else {
      let current = this.first;
      while (current.next) {
        current = current.next;
      }

      const freeSpaceIndex = current.data.indexOf(undefined);
      if (freeSpaceIndex >= 0) {
        current.data[freeSpaceIndex] = data;
      } else {
        const array = new Array(this.capacity).fill(undefined);
        current.next = new ArrayNode(array);
        current.next.data[0] = data;

        const last = this.last;
        this.last = current.next;
        this.last.prev = last;
      }
    }

    this.length++;
    return this;
  }

  get(index) {
    return [...this.values][index];
  }

  *values() {
    let current = this.first;
    while (current) {
      for (const value of current.data) {
        if (value) yield value;
      }
      current = current.next;
    }
  }
}
