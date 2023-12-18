// Challenge: Array of Products of All Elements
// Given an array, return an array where each index stores the product of all numbers in the array except the number at the index itself.

// Implement a function, findProduct(arr), which modifies an array so that each index has a product of all the numbers present in the array except the number stored at that index.

// Input: An array of numbers (can even be floats, integers, and negative!)

// Output: An array such that each index has a product of all the numbers in the array except the number stored at that index.

// Time complexity: O(n^2)
function findProduct(arr) {
  const len = arr.length;
  const passed = [];
  const result = new Array(len);

  let i = len - 1;

  while (i >= 0) {
    const last = arr.pop();
    result[i] = [...arr, ...passed].reduce((acc, current) => acc * current, 1);
    passed.push(last);
    i--;
  }

  return result;
}

console.log(findProduct([1, 2, 3, 4]));
