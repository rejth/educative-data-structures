import { BinarySearchTree } from './binary-search-tree.js';

function isPlainObject(type) {
  return type === '[object Object]';
}

function getType(value) {
  return Object.prototype.toString.call(value);
}

// It works only for JSON-serializable values (numbers, strings, boolean, null, plain objects, arrays).
// It does not handle cyclic objects, i.e., objects with circular references.
function deepEqual(valueA, valueB) {
  // we handle if the values have the same value and data type
  // Object.is() handles undefined, null, strings, numbers, booleans, BigInts
  // Objects and Arrays do not fall under the Object.is()
  if (Object.is(valueA, valueB)) {
    return true;
  }

  // at this point, we have either different values or different data types,
  // so we need to check the data types that don't fall under Object.is() properly
  // these types are objects (plain object) and arrays
  const bothObjects = isPlainObject(getType(valueA)) && isPlainObject(getType(valueB));
  const bothArrays = Array.isArray(valueA) && Array.isArray(valueB);

  // if they're not both plain objects or both arrays,
  // that means they have different values, so they're definitely not equal
  if (!bothObjects && !bothArrays) {
    return false;
  }

  // at this point, we have either plain objects or arrays
  const entriesA = Object.entries(valueA);
  const entriesB = Object.entries(valueB);

  if (entriesA.length !== entriesB.length) {
    return false;
  }

  for (const [index, value] of entriesA) {
    if (!deepEqual(value, valueB[index])) return false;
  }

  return true;
}

export function isSameTree(rootA, rootB) {
  // both roots are null
  if (!rootA && !rootB) return true;
  // one of the roots is null
  if (!rootA || !rootA) return false;
  // one of rootA and rootB has a different value
  if (!deepEqual(rootA.value, rootB.value)) return false;

  return isSameTree(rootA.leftChild, rootB.leftChild) && isSameTree(rootA.rightChild, rootB.rightChild);
}

const bst1 = new BinarySearchTree(10);
bst1.insert(4);
bst1.insert(15);
bst1.insert(1);
bst1.insert(14);

const bst2 = new BinarySearchTree(10);
bst2.insert(4);
bst2.insert(15);
bst2.insert(1);
bst2.insert(14);

console.log(isSameTree(bst1.root, bst2.root)); // true

const bst3 = new BinarySearchTree(10);
bst3.insert(4);
bst3.insert(15);
bst3.insert(1);
bst3.insert(14);

const bst4 = new BinarySearchTree(10);
bst4.insert(4);
bst4.insert(15);
bst4.insert(1);
bst4.insert(14);
bst4.insert(20);

console.log(isSameTree(bst3.root, bst4.root)); // false

const bst5 = new BinarySearchTree(10);
bst5.insert(4);
bst5.insert(15);
bst5.insert(1);
bst5.insert(14);
bst5.insert(20);

const bst6 = new BinarySearchTree(10);
bst6.insert(9);
bst6.insert(15);
bst6.insert(1);
bst6.insert(14);
bst6.insert(20);

console.log(isSameTree(bst5.root, bst6.root)); // false
