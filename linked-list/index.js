class ListNode {
  constructor(data) {
    this.data = data;
    this.next = null;
    this.prev = null;
  }
}

class LinkedList {
  constructor() {
    this.head = null;
    this.tail = null;
    this.length = 0;
  }

  // Time complexity: O(1)
  push(data) {
    const node = new ListNode(data);

    if (this.isEmpty()) {
      this.head = node;
      this.tail = node;
    } else {
      const tail = this.tail;

      this.tail = node;
      this.tail.prev = tail;
      this.tail.prev.next = node;
      this.tail.prev.next.prev = tail;
    }

    this.length++;
    return this;
  }

  // Time complexity: O(1)
  unshift(data) {
    const node = new ListNode(data);

    if (this.isEmpty()) {
      this.head = node;
      this.tail = node;
    } else {
      const head = this.head;
      this.head = node;
      this.head.next = head;
      this.head.next.prev = this.head;
    }

    return ++this.length;
  }

  // Time complexity: O(1)
  pop() {
    if (!this.tail) return undefined;
    const tail = this.tail;

    if (this.length > 1) {
      this.tail = tail.prev;
      this.tail.next = null;
    }

    this.length--;

    if (this.length === 0) {
      this.head = null;
      this.tail = null;
    }

    return tail;
  }

  // Time complexity: O(1)
  shift() {
    if (this.isEmpty()) return undefined;
    const head = this.head;

    if (this.length > 1) {
      this.head = head.next;
      this.head.prev = null;
    }

    this.length--;

    if (this.length === 0) {
      this.head = null;
      this.tail = null;
    }

    return head;
  }

  // Time complexity: O(n)
  search(value) {
    if (this.isEmpty()) return undefined;
    let current = this.head;

    while (current) {
      if (current.data === value) return true;
      current = current.next;
    }

    return false;
  }

  // Time complexity: O(n)
  deleteValue(value) {
    if (this.isEmpty()) return undefined;
    let current = this.head;
    let deleted = null;

    while (current) {
      if (current.data === value) {
        current.prev.next = current.next;
        current.next.prev = current.prev;
        deleted = current;
        return deleted;
      }
      current = current.next;
    }

    return deleted;
  }

  // Time complexity: O(n)
  removeDuplicates() {
    if (this.isEmpty()) return undefined;

    const set = new Set();
    const getData = (obj) =>
      typeof obj === 'object' ? JSON.stringify(obj) : obj;
    let current = this.head;

    while (current.next) {
      const data = current.data;
      const value = getData(data);

      if (set.has(value)) {
        current.prev.next = current.next;
        current.next.prev = current.prev;
        this.length--;
      } else {
        set.add(value);
      }
      current = current.next;
    }

    const value = getData(this.tail.data);

    if (set.has(value)) {
      const tail = this.tail;
      this.tail = tail.prev;
      this.tail.next = null;
      this.length--;
    }

    return this;
  }

  isEmpty() {
    return this.head == null;
  }

  print() {
    if (this.isEmpty()) return;
    let current = this.head;

    while (current) {
      process.stdout.write(String(temp.data));
      process.stdout.write(' -> ');
      current = current.next;
    }

    console.log('null');
  }
}

const list = new LinkedList();

list.push({ a: 1, b: 2 });
list.push(2);
list.push(3);
list.push({ a: 1, b: 2 });

console.log('list:', list);
console.log(list.removeDuplicates());

// console.log(list.head.next.next); // 1

// console.log(list.search(2));
// console.log(list.deleteValue(2));
