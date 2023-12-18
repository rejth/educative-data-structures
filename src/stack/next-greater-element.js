function mapNextGreater(arr) {
  const result = [];

  arr.forEach((item, i) => {
    if (i === arr.length - 1) {
      result.push(-1);
      return;
    }
    for (const el of arr.slice(i)) {
      if (el > item) {
        result.push(el);
        return;
      }
    }
  });

  return result;
}

console.log(mapNextGreater([4, 6, 3, 2, 8, 1]));

function mapNextGreater2(array) {
  const result = new Array(array.length);
  const stack = [];
  let next, top;

  const getTop = () => stack[stack.length - 1];

  for (let i = array.length - 1; i >= 0; i--) {
    next = array[i];

    if (stack.length > 0) {
      top = getTop();
      while (top <= next) {
        if (stack.length === 0) break;
        stack.pop();
        top = getTop();
      }
    }

    if (stack.length > 0) {
      result[i] = getTop();
    } else {
      result[i] = -1;
    }

    stack.push(next);
  }

  return result;
}

console.log(mapNextGreater2([4, 6, 3, 2, 8, 1]));
