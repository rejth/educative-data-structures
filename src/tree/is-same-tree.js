import { BinarySearchTree } from './binary-search-tree.js';
import { deepEqual } from '../shared/deep-equal.js';

/**
 * Given the roots of two binary trees 'p' and 'q'.
 * Write a function to check if they are the same or not.
 *
 * Two binary trees are considered the same if they met following two conditions:
 * 1. Both trees are structurally identical.
 * 2. Each corresponding node on both the trees has the same value.
 */

/**
 * Time complexity: O(min(m, n)), m, n - the number of nodes in the given trees respectively
 * Space complexity: O(h), h - the height of the biggest tree
 */
export function isSameTree(rootA, rootB) {
  // both roots are null
  if (!rootA && !rootB) return true;
  // one of the roots is null
  if (!rootA || !rootB) return false;
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
