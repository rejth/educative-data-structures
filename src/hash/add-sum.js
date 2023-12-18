// Implement a function, which takes an array, a number and value as input and returns an array of two numbers that add up to value.
export function findSum(list, sum) {
  const set = new Set([...list]);

  for (const value of list) {
    const diff = sum - value;
    if (set.has(diff)) return [value, diff];
  }
}

console.log(findSum([1, 21, 3, 14, 5, 60, 7, 6], 81)); // [21, 60]
