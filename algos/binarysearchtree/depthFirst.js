class Node {
  constructor(val) {
    this.val = val;
    this.left = null;
    this.right = null;
  }
}

const a = new Node("a");
const b = new Node("b");
const c = new Node("c");
const d = new Node("d");
const e = new Node("e");
const f = new Node("f");

a.left = b;
a.right = c;
b.left = d;
b.right = e;
c.right = f;

//      a
//    /   \
//   b     c
//  / \     \
// d   e     f
const values = [];
const stack = [];

// my approach
const depthFirst = (node) => {
  if (!node) {
    return;
  }

  if (stack.length && stack[0].val === node.val) {
    stack.shift();
  }

  if (!node.left && !node.right) {
    values.push(node.val);
    if (stack.length) {
      depthFirst(stack[0]);
    }
    return;
  }

  if (node.right) {
    stack.unshift(node.right);
  }

  if (node.left) {
    stack.unshift(node.left);
  }

  values.push(node.val);

  if (stack.length) {
    depthFirst(stack[0]);
  }
};

depthFirst(a);

// iterative approach
const depthFirstValuesIterative = (root) => {
  if (!root) {
    return [];
  }

  const stack = [root];
  const values = [];

  while (stack.length > 0) {
    const current = stack.shift();
    values.push(current.val);

    if (current.right) {
      stack.unshift(current.right);
    }

    if (current.left) {
      stack.unshift(current.left);
    }
  }

  return values;
};

const depthFirstValuesRecursive = (root) => {
  if (!root) return [];
  const left = depthFirstValuesRecursive(root.left);
  const right = depthFirstValuesRecursive(root.right);
  return [root.val, ...left, ...right];
};

console.log(depthFirstValuesRecursive(a));
