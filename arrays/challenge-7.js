// Challenge: Find Second Maximum Value in an Array
// Given an array of size n, can you find the second maximum element in the array?

// Implement a function findSecondMaximum(arr), which returns the second largest element in the array.

// Input: An array of integers

// Output: The second largest element in the array

// Time complexity O(n)
function findSecondMaximum(arr) {
  let firstMax = 0;
  let secondMax = 0;

  for (const value of arr) {
    if (value > firstMax) firstMax = value;
  }
  for (const value of arr) {
    if (value < firstMax && value > secondMax) secondMax = value;
  }

  return secondMax;
}

console.log(findSecondMaximum([2, 3, 3, 3, 3]));
