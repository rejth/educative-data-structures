// Implement a function, findFirstUnique(arr), which takes an array as input and returns the first unique integer in the array.
export function findFirstUnique(list) {
  const map = list.reduce((acc, current) => {
    const value = acc.get(current);
    if (!value) acc.set(current, 1);
    else acc.set(current, value + 1);
    return acc;
  }, new Map());

  for (const [key, value] of map) {
    if (value === 1) return key;
  }
}

console.log(findFirstUnique([9, 2, 3, 2, 6, 6])); // 9
