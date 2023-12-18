import { Bucket } from './Bucket.js';

export class HashMap {
  #store;

  constructor(capacity) {
    this.capacity = capacity;
    this.size = 0;
    this.#store = new Array(capacity);
    for (let i = 0; i < capacity; i++) {
      this.#store[i] = new Bucket(capacity);
    }
  }

  get store() {
    return this.#store;
  }

  #hash(key) {
    key = String(key);
    let hashKey = 0;

    for (let i = 0; i < key.length; i++) {
      const unicode = key.charCodeAt(i);
      hashKey = (hashKey * 27 + unicode) % this.capacity;
    }

    return hashKey;
  }

  set(key, value) {
    const hashKey = this.#hash(key);
    const bucket = this.store[hashKey];

    bucket.push([key, value]);
    this.size++;

    return this;
  }

  get(key) {
    if (this.size === 0) return undefined;

    const hashKey = this.#hash(key);
    const bucket = this.store[hashKey];

    return bucket.find(key);
  }

  *entries() {
    for (const bucket of this.store) {
      yield* bucket.entries();
    }
  }

  *keys() {
    for (const bucket of this.store) {
      yield* bucket.keys();
    }
  }

  *values() {
    for (const bucket of this.store) {
      yield* bucket.values();
    }
  }
}

const map = new HashMap(3);

map.set('foo', 'bar');
map.set(10, 'bla');
map.set('q', 'qwer1');
map.set('e', 'qwer2');

console.log(map);
console.log(map.get('foo')); // 'bar'
console.log(map.get(10)); // 'bla'

for (const [key, value] of map.entries()) {
  console.log('Key/Value pair of Hash Map: ', `${key} + ${value}`);
}

for (const key of map.keys()) {
  console.log('Key of Hash Map: ', key);
}

for (const value of map.values()) {
  console.log('Value of Hash Map: ', value);
}
