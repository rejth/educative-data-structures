/**
 * Input: nums = [-4,-1,0,3,10]
 * Output: [0,1,9,16,100]
 * Explanation: After squaring, the array becomes [16,1,0,9,100].
 * After sorting, it becomes [0,1,9,16,100].
 */

function sortedSquares(nums) {
  const len = nums.length;
  const result = new Array(len).fill(0);

  let smallestIdx = 0;
  let largestIdx = len - 1;

  for (let i = len - 1; i >= 0; i--) {
    const smallest = nums[smallestIdx];
    const largest = nums[largestIdx];

    if (Math.abs(largest) > Math.abs(smallest)) {
      result[i] = largest * largest;
      largestIdx--;
    } else {
      result[i] = smallest * smallest;
      smallestIdx++;
    }
  }

  return result;
}

// Test cases
console.log(sortedSquares([-4, -1, 0, 3, 10])); // [0,1,9,16,100]
console.log(sortedSquares([-7, -3, 2, 3, 11])); // [4,9,9,49,121]
