const Node = require("./Node");

// breadth first and depth first just check to see if its in the stack or queue

const recurse = (root, searchValue) => {
  if (!root) {
    return false;
  }

  if (root.val === searchValue) {
    return true;
  }

  return recurse(root.left, searchValue) || recurse(root.right, searchValue);
};

console.log(recurse(Node.a, "e"));
