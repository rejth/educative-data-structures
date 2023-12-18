// Challenge: Rearrange Sorted Array in Max/Min Form
// Arrange elements in such a way that the maximum element appears at first, then minimum at second, then second maximum at third position and second minimum at fourth, and so on.

// Input: A sorted array

// Output: An array with elements stored in max/min form

// Time complexity O(n)
function maxMin(arr) {
  let i = 0;
  let j = arr.length - 1;
  const result = [];

  while (i <= j) {
    const min = arr[i];
    const max = arr[j];
    if (i === j) {
      result.push(min);
    } else {
      result.push(max);
      result.push(min);
    }

    i++;
    j--;
  }

  return result;
}

console.log(maxMin([1, 2, 3, 4, 5]));
