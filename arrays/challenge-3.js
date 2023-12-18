// Challenge: Find Two Numbers that Add up to "value"
// Given an array and a number "value", find two numbers from the array that sum to 'value'.

// In this problem, you have to implement the findSum(arr, value) function, which takes an array arr, a number and value as input and returns an array of two numbers that add up to value.

// Input: An array and a number value

// Output: An array with two integers a and b ([a,b]) that add up to value

// Time complexity: O(nlog(n))
// Coding pattern: Two pointers (moving indices)
function findSum(arr, target) {
  let i = 0;
  let j = arr.length - 1;

  arr.sort((a, b) => a - b);

  while (i < j) {
    const sum = arr[i] + arr[j];
    if (sum === target) {
      return [arr[i], arr[j]];
    } else if (target > sum) {
      i++;
    } else if (target < sum) {
      j--;
    }
  }

  return false;
}

console.log(findSum([1, 21, 3, 14, 5, 60, 7, 6], 81));

// Time complexity: O(logn)
function binarySearch(arr, target) {
  let start = 0;
  let end = arr.length - 1;

  while (start <= end) {
    let middle = Math.floor((start + end) / 2);
    const value = arr[middle];
    if (value === target) return middle;
    if (value < target) {
      start = middle + 1;
    } else {
      end = middle - 1;
    }
  }
}

// Time complexity: O(nlogn)
function findSumBinarySearch(arr, target) {
  let index;

  arr.sort((a, b) => a - b);

  for (let i = 0; i < arr.length; i++) {
    const currentValue = arr[i];
    index = binarySearch(arr, target - currentValue);
    if (index) return [currentValue, target - currentValue];
  }

  return null;
}

console.log(findSumBinarySearch([1, 21, 3, 14, 5, 60, 7, 6], 81));
