// Challenge: Merge Two Sorted Arrays
// Given two sorted arrays, merge them into one array that is sorted.

// Problem Statement: Implement a function that merges two sorted arrays into another sorted array. Name it mergeArrays(arr1, arr2).

// Input: Two sorted arrays.

// Output: A merged sorted array consisting of all elements of both input arrays.

// Time complexity: O(nlogn)
// function mergeArrays1(arr1, arr2) {
//   return [...arr1, ...arr2].sort((a, b) => a - b);
// }

// console.log(mergeArrays1([4, 5, 6], [-2, -1, 0, 7]));

// Time complexity: O(n + m)
// Coding pattern: Two pointers (moving indices)
function mergeArrays2(arr1, arr2) {
  let i = 0;
  let j = 0;
  let merged = [];
  const l1 = arr1.length;
  const l2 = arr2.length;

  while (i < l1 && j < l2) {
    if (arr1[i] < arr2[j]) {
      merged.push(arr1[i]);
      i++;
    } else {
      merged.push(arr2[j]);
      j++;
    }
  }

  if (i <= l1 - 1) {
    arr1.splice(0, i);
    merged = merged.concat(arr1);
  } else {
    arr2.splice(0, j);
    merged = merged.concat(arr2);
  }

  return merged;
}

console.log(mergeArrays2([1, 3, 4, 5], [2, 6, 7, 8]));
console.log(mergeArrays2([7, 9, 13, 19], [0, 4, 5, 8]));
