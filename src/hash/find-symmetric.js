import { HashMap } from './HashMap.js';

export function findSymmetric(list) {
  const map = new HashMap(list.length);
  const pairs = [];

  list.forEach(([first, second]) => {
    map.set(first, second);
    const value = map.get(second);
    if (value === first) {
      pairs.push([first, second]);
      pairs.push([second, first]);
    }
  });

  return pairs;
}

console.log(
  findSymmetric([
    [1, 2],
    [3, 4],
    [5, 9],
    [4, 3],
    [9, 5],
  ]),
);
