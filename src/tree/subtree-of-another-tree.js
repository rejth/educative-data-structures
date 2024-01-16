import { BinarySearchTree } from './binary-search-tree.js';
import { isSameTree } from './is-same-tree.js';

/**
 * Given two binary trees A and B, determine if tree B is a subtree of tree A.
 * A tree B is considered a subtree of A if there exists a node in A such that the subtree of that node is identical to B.
 * Both trees are considered identical if their structure and nodes are the same.
 */

class TreeNode {
  constructor(val, left = null, right = null) {
    this.value = val;
    this.leftChild = left;
    this.rightChild = right;
  }
}

/**
 * Time complexity: O(m * n), m - the number of nodes of tree A, n - the number of nodes of tree B
 * Space complexity: O(m), m - the depth of tree A
 */
export function isSubtree(rootA, rootB) {
  if (!rootA) return false;
  return isSameTree(rootA, rootB) || isSubtree(rootA.leftChild, rootB) || isSubtree(rootA.rightChild, rootB);
}

let s1 = new TreeNode(3, new TreeNode(4, new TreeNode(1), new TreeNode(2)), new TreeNode(5));
let t1 = new TreeNode(4, new TreeNode(1), new TreeNode(2));
console.log(isSubtree(s1, t1)); // true

let s2 = new TreeNode(1, new TreeNode(2), new TreeNode(3));
let t2 = new TreeNode(2, new TreeNode(3));
console.log(isSubtree(s2, t2)); // false

let s3 = new TreeNode(3, new TreeNode(4, new TreeNode(1), new TreeNode(2, new TreeNode(0))), new TreeNode(5));
let t3 = new TreeNode(4, new TreeNode(1), new TreeNode(2));
console.log(isSubtree(s3, t3)); // false

// ----------------------------------------------------------------

const bst1 = new BinarySearchTree(3);
bst1.insert(4);
bst1.insert(5);
bst1.insert(1);
bst1.insert(2);

const bst2 = new BinarySearchTree(4);
bst2.insert(1);
bst2.insert(2);

console.log(isSubtree(bst1.root, bst2.root)); // false

// ----------------------------------------------------------------

const bst3 = new BinarySearchTree(1);
bst3.insert(2);
bst3.insert(3);

const bst4 = new BinarySearchTree(2);
bst4.insert(3);

console.log(isSubtree(bst3.root, bst4.root)); // true

// ----------------------------------------------------------------

const bst5 = new BinarySearchTree(3);
bst5.insert(4);
bst5.insert(5);
bst5.insert(1);
bst5.insert(2);
bst5.insert(0);

const bst6 = new BinarySearchTree(4);
bst6.insert(1);
bst6.insert(2);

console.log(isSubtree(bst5.root, bst6.root)); // false

// ----------------------------------------------------------------
