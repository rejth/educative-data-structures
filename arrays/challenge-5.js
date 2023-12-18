// Challenge: Find Minimum Value in Array
// Given an array of size "n". Can you find the minimum value in the array?

// Implement a function findMinimum(arr) that finds the smallest number in the given array.

// Input: An array of integers

// Output: The smallest number in the array

// Time complexity: O(n)
function findMinimum(arr) {
  const obj = {};
  arr.forEach((el) => (obj[el] = el));
  return new Map(Object.entries(obj)).keys().next().value;
}

console.log(findMinimum([100, 12, 34, 40]));
