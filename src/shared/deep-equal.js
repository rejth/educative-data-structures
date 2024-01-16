export function isPlainObject(type) {
  return type === '[object Object]';
}

export function getType(value) {
  return Object.prototype.toString.call(value);
}

// It works only for JSON-serializable values (numbers, strings, boolean, null, plain objects, arrays).
// It does not handle cyclic objects, i.e., objects with circular references.
export function deepEqual(valueA, valueB) {
  // we handle if the values have the same value and data type
  // Object.is() handles undefined, null, strings, numbers, booleans, BigInts
  // Objects and Arrays do not fall under the Object.is()
  if (Object.is(valueA, valueB)) {
    return true;
  }

  // at this point, we have either different values or different data types,
  // so we need to check the data types that don't fall under Object.is() properly
  // these types are objects (plain object) and arrays
  const bothObjects = isPlainObject(getType(valueA)) && isPlainObject(getType(valueB));
  const bothArrays = Array.isArray(valueA) && Array.isArray(valueB);

  // if they're not both plain objects or both arrays,
  // that means they have different values, so they're definitely not equal
  if (!bothObjects && !bothArrays) {
    return false;
  }

  // at this point, we have either plain objects or arrays
  const entriesA = Object.entries(valueA);
  const entriesB = Object.entries(valueB);

  if (entriesA.length !== entriesB.length) {
    return false;
  }

  for (const [index, value] of entriesA) {
    if (!deepEqual(value, valueB[index])) return false;
  }

  return true;
}
