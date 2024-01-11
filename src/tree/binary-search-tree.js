class Node {
  constructor(value) {
    this.value = value;
    this.leftChild = null;
    this.rightChild = null;
  }
}

/*
    A binary tree is a tree in which each node has between 0-2 children.
    A binary tree is height-balanced if, for each node in the tree, the difference between the height of the right subtree and the left subtree is, at most, one.
    ∣Height(LeftSubTree) − Height(RightSubTree)∣ <= 1

    In the case of binary search trees, the time complexity of all three basic operations - Insertion, Deletion, and Search, take O(h) time,
    where “h” is the height of Binary Search Tree.
    The worst-case time complexity is O(n) for skewed BSTs, where “n” is the number of nodes in the tree.
    However, in the best-case scenario, when the tree is completely balanced, the time complexity for basic operations is O(log(n))
* */
export class BinarySearchTree {
  constructor(rootValue) {
    this.root = new Node(rootValue);
  }

  // the elements are traversed in “root-left-right” order,
  // so the current node will be visited before its children nodes.
  preOrderTraversal(currentNode, traversal = []) {
    if (currentNode) {
      traversal.push(currentNode.value);
      this.preOrderTraversal(currentNode.leftChild, traversal);
      this.preOrderTraversal(currentNode.rightChild, traversal);
    }
    return traversal;
  }

  //  the elements are traversed in “left-root-right” order,
  //  so they are traversed in order.
  inOrderTraversal(currentNode, traversal = []) {
    if (currentNode) {
      this.inOrderTraversal(currentNode.leftChild, traversal);
      traversal.push(currentNode.value);
      this.inOrderTraversal(currentNode.rightChild, traversal);
    }
    return traversal;
  }

  // the elements are traversed in “left-right-root” order,
  // so the current node will be visited after its children nodes.
  postOrderTraversal(currentNode, traversal = []) {
    if (currentNode) {
      this.postOrderTraversal(currentNode.leftChild, traversal);
      this.postOrderTraversal(currentNode.rightChild, traversal);
      traversal.push(currentNode.value);
    }
    return traversal;
  }

  // O(log(n)) if a BST is balanced
  // Otherwise - O(h), h - the height of the BST
  search(value) {
    if (!this.root) return undefined;
    let currentNode = this.root;

    while (currentNode && currentNode.value !== value) {
      if (value < currentNode.value) {
        currentNode = currentNode.leftChild;
      } else {
        currentNode = currentNode.rightChild;
      }
    }

    return currentNode;
  }

  // O(log(n)) if a BST is balanced
  // Otherwise - O(h), h - the height of the BST,
  // However, when a node is deleted it usually becomes unbalanced
  delete(currentNode, value) {
    if (!currentNode) return false;
    let parent;

    while (currentNode && currentNode.value !== value) {
      parent = currentNode;
      if (value < currentNode.value) {
        currentNode = currentNode.leftChild;
      } else {
        currentNode = currentNode.rightChild;
      }
    }

    // the node to be deleted was not found
    if (!currentNode) return false;

    // if the node to be deleted is a leaf, i.e., left and right children are equal to null,
    // we'll link the right child to the parent of the node to be deleted
    if (!currentNode.leftChild && !currentNode.rightChild) {
      if (currentNode.value === this.root.value) {
        this.root = null;
        return true;
      } else if (currentNode.value < parent.value) {
        parent.leftChild = null;
        return true;
      } else {
        parent.rightChild = null;
        return true;
      }
    } else if (!currentNode.rightChild) {
      // if the node to be deleted has a left child only,
      // we'll link the left child to the parent of the node to be deleted
      if (currentNode.value === this.root.value) {
        this.root = currentNode.leftChild;
        return true;
      } else if (currentNode.value < parent.value) {
        parent.leftChild = currentNode.leftChild;
        return true;
      } else {
        parent.rightChild = currentNode.leftChild;
        return true;
      }
    } else if (!currentNode.leftChild) {
      // if the node to be deleted has a right child only,
      // we'll link the right child to the parent of the node to be deleted
      if (currentNode.value === this.root.value) {
        this.root = currentNode.rightChild;
        return true;
      } else if (currentNode.value < parent.value) {
        parent.leftChild = currentNode.rightChild;
        return true;
      } else {
        parent.rightChild = currentNode.rightChild;
        return true;
      }
    } else {
      let minRight = currentNode.rightChild;
      // traverse to find the left most node (minimal node) in the right subtree
      while (minRight.leftChild) {
        minRight = minRight.leftChild;
      }

      const minRightValue = minRight.value;
      // delete the left most node in the right subtree
      // by calling the same delete function
      // to cater for whether it has children or not
      this.delete(this.root, minRight.value);

      // replace the currentNode with left most node in the right subtree
      currentNode.value = minRightValue;
      return true;
    }
  }

  // O(log(n)) if a BST is balanced
  // Otherwise - O(h), h - the height of the BST,
  // However, when a node is inserted into a BST it usually becomes unbalanced
  insert(value) {
    if (!this.root) {
      this.root = new Node(value);
      return;
    }

    let currentNode = this.root;
    let parent;

    while (currentNode) {
      parent = currentNode;
      if (value < currentNode.value) {
        currentNode = currentNode.leftChild;
      } else {
        currentNode = currentNode.rightChild;
      }
    }

    if (value < parent.value) {
      parent.leftChild = new Node(value);
    } else {
      parent.rightChild = new Node(value);
    }
  }

  invert(root) {
    if (!root) return null;

    // Swap the left and right children of the current node
    [root.leftChild, root.rightChild] = [root.rightChild, root.leftChild];

    this.invert(root.leftChild);
    this.invert(root.rightChild);

    return root;
  }

  // O(h), h - the height of the BST
  // in the worst case, the BST will be left-skewed and the height will be n, so the time complexity will be O(n)
  findMin(root) {
    if (!root) return undefined;

    let currentNode = root;
    let parent;

    while (currentNode) {
      parent = currentNode;
      currentNode = currentNode.leftChild;
    }

    return parent.value;
  }

  // O(h), h - the height of the BST
  findKthMax(root, k) {
    if (!root || k < 0) return undefined;

    let currentNode = root;
    let height = 0;
    let parent;

    while (currentNode && height <= k) {
      parent = currentNode;
      currentNode = currentNode.rightChild;
      height++;
    }

    return parent.value;
  }

  // O(n)
  findAncestors(root, value) {
    if (!root || !value) return undefined;

    const ancestors = [];
    let currentNode = root;
    let parent;

    while (currentNode && currentNode.value !== value) {
      parent = currentNode;
      ancestors.push(parent.value);
      if (value < currentNode.value) {
        currentNode = currentNode.leftChild;
      } else {
        currentNode = currentNode.rightChild;
      }
    }

    return ancestors;
  }

  // O(n)
  findHeight(root) {
    if (!root) return undefined;

    let currentNode = root;
    let heightLeft = 0;
    let heightRight = 0;

    while (currentNode) {
      currentNode = currentNode.leftChild;
      heightLeft++;
    }

    currentNode = root;

    while (currentNode) {
      currentNode = currentNode.rightChild;
      heightRight++;
    }

    return Math.max(heightLeft, heightRight);
  }

  // O(n)
  findKNodes(root, k) {
    const traverse = (currentNode, k, kNodes = []) => {
      if (!currentNode) return kNodes;
      if (k === 0) kNodes.push(currentNode.value);

      traverse(currentNode.leftChild, k - 1, kNodes);
      traverse(currentNode.rightChild, k - 1, kNodes);
      return kNodes;
    };

    return traverse(this.root, k, []);
  }
}

// create a completely balanced Binary Search Tree, basically this is an AVL Tree
const bst = new BinarySearchTree(6);
bst.insert(4);
bst.insert(9);
bst.insert(5);
bst.insert(2);
bst.insert(8);
bst.insert(12);
bst.insert(10);
bst.insert(14);

console.log(bst.root);
console.log(bst.preOrderTraversal(bst.root));
console.log(bst.inOrderTraversal(bst.root));
console.log(bst.postOrderTraversal(bst.root));

console.log(bst.search(9));

console.log(bst.findMin(bst.root));
console.log(bst.findKthMax(bst.root, 3));
console.log(bst.findAncestors(bst.root, 10));
console.log(bst.findHeight(bst.root));
console.log(bst.findKNodes(bst.root, 2));

console.log(bst.preOrderTraversal(bst.invert(bst.root)));

bst.delete(bst.root, 12);
console.log(bst.root);
