// Challenge: Find First Unique Integer in an Array
// Given an array, find the first integer, which is unique in the array. Unique means the number does not repeat and appears only once in the whole array.

// Implement a function, findFirstUnique(arr), which takes an array as input and returns the first unique integer in the array.

// Input: An array of integers

// Output: The first unique element in the array

// Time complexity O(n)
function findFirstUnique(arr) {
  const map = arr.reduce((acc, current) => {
    const count = acc.get(current);
    if (!count) acc.set(current, 1);
    else acc.set(current, count + 1);
    return acc;
  }, new Map());

  for (const [key, value] of map.entries()) {
    if (value === 1) return key;
  }
}

console.log(findFirstUnique([9, 2, 3, 2, 6, 6]));
