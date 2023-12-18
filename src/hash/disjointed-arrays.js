import { HashMap } from './HashMap.js';

export function isDisjointed(list1, list2) {
  if (list2.length > list1.length) return false;

  const map = new HashMap(list1.length);

  list1.forEach((el) => {
    map.set(el, el);
  });

  return list2.every((el) => !map.get(el));
}

console.log(isDisjointed([9, 4, 3, 1, -2, 6, 5], [7, 10, 8]));
