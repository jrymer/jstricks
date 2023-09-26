const Node = require("./Node");

const iterative = (root) => {
  if (!root) {
    return [];
  }

  const queue = [root];
  const values = [];

  while (queue.length > 0) {
    const current = queue.shift();
    values.push(current.val);

    if (current.left) {
      queue.push(current.left);
    }
    if (current.right) {
      queue.push(current.right);
    }
  }

  return values;
};

console.log("iterative", iterative(Node.a));
