// Challenge: Rearrange Positive & Negative Values
// Given an array, can you re-arrange its elements in such a way that the negative elements appear at one side and positive elements appear in the other?

// Implement a function, reArrange(arr), which sorts the elements so that all the negative elements appear on the left, and all positive elements appear at the right.

// Input: An array containing positive and negative elements

// Output: A sorted array with negative elements at the left and positive elements at the right

// Time complexity O(n)
function reArrange(arr) {
  const negative = [];
  const positive = [];

  arr.forEach((el) => {
    if (el < 0) negative.push(el);
    else positive.push(el);
  });

  return negative.concat(positive);
}

console.log(reArrange([10, -1, 20, 4, 5, -9, -6]));
