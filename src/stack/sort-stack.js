function sortStack(stack) {
  const tempStack = [];

  while (stack.length > 0) {
    const value = stack.pop();

    if (value >= tempStack[tempStack.length - 1]) {
      tempStack.push(value);
    } else {
      while (tempStack.length > 0) {
        stack.push(tempStack.pop());
      }

      tempStack.push(value);
    }
  }

  return tempStack;
}

console.log(sortStack([23, 60, 12, 42, 4, 97, 2]));
