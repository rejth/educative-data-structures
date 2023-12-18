// find only two pairs in array so a + b = c + d
export function findTwoPairs(list) {
  const map = new Map();
  const result = [];

  for (let i = 0; i < list.length; i++) {
    const first = list[i];
    if (i === list.length - 1) return result;

    for (let j = i + 1; j < list.length; j++) {
      const second = list[j];
      const sum = first + second;
      const pair = [first, second];

      const firstSum = map.get(sum);
      if (firstSum) {
        result.push(firstSum);
        result.push(pair);
        return result;
      }
      map.set(sum, pair);
    }
  }

  return result;
}

console.log(findTwoPairs([3, 4, 7, 1, 12, 9])); // [[4, 12], [7, 9]]
