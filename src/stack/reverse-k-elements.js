function reverseK1(arr, k) {
  const slicedK = arr.slice(0, k).reverse();
  return slicedK.concat(arr.slice(k));
}

console.log(reverseK1([1, 2, 3, 4, 5, 6, 7, 8, 9, 10], 5));

function reverseK2(arr, k) {
  const result = new Array(arr.length);
  let j = k - 1;

  for (let i = 0; i < k; i++) {
    result[j] = arr[i];
    j--;
  }
  for (let i = k; i < arr.length; i++) {
    result[i] = arr[i];
  }

  return result;
}

console.log(reverseK2([1, 2, 3, 4, 5, 6, 7, 8, 9, 10], 5));

function reverseK3(arr, k) {
  const stack = arr.slice(0, k);
  let i = 0;

  while (stack.length > 0) {
    arr[i] = stack.pop();
    i++;
  }

  return arr;
}

console.log(reverseK3([1, 2, 3, 4, 5, 6, 7, 8, 9, 10], 5));
