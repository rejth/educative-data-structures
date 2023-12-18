// Challenge: Maximum Sum Subarray
// Given an array, find the contiguous subarray with the largest sum.

// Given an integer array, return the maximum subarray sum. The array may contain both positive and negative integers and is unsorted.
// Input: an array A
// Output: a number (maximum subarray sum)

// Kadane’s Algorithm
function findMaxSumSubArray(array) {
  if (array.length === 0) return 0;

  let currentMax = array[0];
  let globalMax = array[0];
  let len = array.length;

  for (let i = 1; i < len; i++) {
    if (currentMax < 0) {
      currentMax = array[i];
    } else {
      currentMax += array[i];
    }

    if (globalMax < currentMax) {
      globalMax = currentMax;
    }
  }

  return globalMax;
}

console.log(findMaxSumSubArray([-4, 2, -5, 1, 2, 3, 6, -5, 1]));
