class TreeNode {
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
    this.root = new TreeNode(rootValue);
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
      this.root = new TreeNode(value);
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
      parent.leftChild = new TreeNode(value);
    } else {
      parent.rightChild = new TreeNode(value);
    }
  }

  invert(root) {
    const stack = [root];

    while (stack.length > 0) {
      const current = stack.pop();

      if (current) {
        [current.leftChild, current.rightChild] = [current.rightChild, current.leftChild];
        stack.push(current.leftChild);
        stack.push(current.rightChild);
      }
    }

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

  findMax(root) {
    if (!root) return undefined;

    let currentNode = root;
    let parent;

    while (currentNode) {
      parent = currentNode;
      currentNode = currentNode.rightChild;
    }

    return parent.value;
  }

  findKSmallest(root, k) {
    if (!root || k < 0) return undefined;

    const stack = [];

    while (true) {
      while (root) {
        stack.push(root);
        root = root.leftChild;
      }

      root = stack.pop();
      k--;

      if (k === 0) {
        return root.value;
      }

      root = root.rightChild;
    }
  }

  findKthGreatest(root, k) {
    if (!root || k < 0) return undefined;

    const stack = [];

    while (true) {
      while (root) {
        stack.push(root);
        root = root.rightChild;
      }

      root = stack.pop();
      k--;

      if (k === 0) {
        return root.value;
      }

      root = root.leftChild;
    }
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

  /**
   * A binary tree's maximum depth is the number of NODES along the longest path from the root node down to the farthest leaf node.
   *
   * @param {TreeNode} root
   * @return {number}
   */
  findMaxDepth(root) {
    if (!root) return -1;
    if (!root.leftChild && !root.rightChild) return 1;

    const queue = [root];
    let maxDepth = 0;

    while (queue.length > 0) {
      const levelSize = queue.length;

      for (let i = 0; i < levelSize; i++) {
        const current = queue.shift();

        if (current.leftChild) {
          queue.push(current.leftChild);
        }
        if (current.rightChild) {
          queue.push(current.rightChild);
        }
      }

      maxDepth++;
    }

    return maxDepth;
  }

  /**
   * A binary tree's height is the number of EDGES along the longest path from the root node down to the farthest leaf node.
   *
   * @param {TreeNode} root
   * @return {number}
   */
  findHeight(root) {
    if (!root) return -1;

    let height = -1; // Initialize the height to -1 (for an empty tree)
    const queue = [root];

    while (queue.length > 0) {
      const levelSize = queue.length;

      for (let i = 0; i < levelSize; i++) {
        const current = queue.shift();

        if (current.leftChild) {
          queue.push(current.leftChild);
        }
        if (current.rightChild) {
          queue.push(current.rightChild);
        }
      }

      height++;
    }

    return height;
  }

  /**
   * A binary tree's diameter is the length of the longest path between any two nodes in a tree.
   * This path may or may not pass through the root.
   *
   * The length of a path between two nodes is represented by the number of EDGES between them.
   *
   * @param {TreeNode} root
   * @return {number}
   */
  findDiameter(root) {
    if (!root) return 0;
    let diameter = 0;

    const height = (node) => {
      if (!node) return 0;

      const leftHeight = height(node.left);
      const rightHeight = height(node.right);

      diameter = Math.max(diameter, leftHeight + rightHeight);
      return Math.max(leftHeight, rightHeight) + 1;
    };

    height(root);
    return diameter;
  }

  /**
   * A height-balanced BST is defined as follows:
   * 1. The difference between the height of the right subtree and the left subtree is, at most, one for each node in the tree:
   * ∣Height(LeftSubTree) − Height(RightSubTree)∣ <= 1
   *
   * @param {TreeNode} root
   * @return {boolean}
   */
  isBalancedBST(root) {
    if (!root) return -1;

    const checkHeight = (node) => {
      if (!node) return 0;

      const leftHeight = checkHeight(node.left);
      const rightHeight = checkHeight(node.right);

      if (leftHeight === -1 || rightHeight === -1 || Math.abs(leftHeight - rightHeight) > 1) {
        return -1;
      }

      return Math.max(leftHeight, rightHeight) + 1;
    };

    return checkHeight(root) !== -1;
  }

  /**
   * A valid BST is defined as follows:
   * 1. The left subtree of a node contains only nodes with keys less than the node's key
   * 2. The right subtree of a node contains only nodes with keys greater than the node's key
   * 3. Both the left and right subtrees must also be binary search trees (in which each node has between 0-2 children)
   *
   * @param {TreeNode} root
   * @return {boolean}
   */
  isValidBST(root) {
    if (!root) return false;

    const inOrderTraversal = (node) => {
      const stack = [];
      const traversal = [];

      let current = node;

      while (stack.length > 0 || current) {
        while (current) {
          stack.push(current);
          current = current.left;
        }

        current = stack.pop();
        traversal.push(current.val);
        current = current.right;
      }

      return traversal;
    };

    const values = inOrderTraversal(root);

    for (let i = 1; i < values.length; i++) {
      if (values[i] <= values[i - 1]) return false;
    }

    return true;
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

// console.log(bst.root);
// console.log(bst.preOrderTraversal(bst.root));
// console.log(bst.inOrderTraversal(bst.root));
// console.log(bst.postOrderTraversal(bst.root));
//
// console.log(bst.search(9));
//
// console.log(bst.findMin(bst.root));
// console.log(bst.findKthMax(bst.root, 3));
// console.log(bst.findAncestors(bst.root, 10));
// console.log(bst.findHeight(bst.root));
// console.log(bst.findKNodes(bst.root, 2));

console.log(bst.preOrderTraversal(bst.invert(bst.root)));

// bst.delete(bst.root, 12);
// console.log(bst.root);
