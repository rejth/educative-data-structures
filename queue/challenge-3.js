function isBalanced(str) {
  const parentheses = { '{': '}', '[': ']', '(': ')' };
  const stack = [];

  for (const item of str) {
    if (parentheses[item]) {
      stack.push(item);
    } else {
      if (!stack.length) return false;
      if (parentheses[stack.pop()] !== item) return false;
    }
  }

  if (stack.length) return false;
  return true;
}

// the number of opened and closed parentheses of a certain type must be equal
// opened and closed parentheses of diffrent types following one by one are not allowed

console.log(isBalanced('{[({})]}'));
