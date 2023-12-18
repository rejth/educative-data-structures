// Challenge: Right Rotate an Array by n
// Given an array, can you rotate its elements from right to left by one index?

// Implement a function rightRotate(arr,n) that will rotate the given array by n.

// Input: An array and a number by which to rotate that array

// Output: The given array rotated by n elements

// Time complexity O(n)
function rightRotate(arr, n) {
  return arr.splice(arr.length - n).concat(arr);
}

console.log(rightRotate([1, 2, 3, 4, 5], 3));
