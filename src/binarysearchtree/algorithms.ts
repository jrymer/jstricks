import { BSTNode } from "./Node";

export const iterativeBreadthFirstTreeIncludes = (
  root: BSTNode,
  searchValue: string
) => {
  if (!root) return false;
  const queue = [root];

  while (queue.length > 0) {
    const current = queue.shift();

    if (!current) return false;
    if (current.val === searchValue) return true;
    if (current.left) queue.push(current.left);
    if (current.right) queue.push(current.right);
  }

  return false;
};

export const recursiveDepthFirstTreeIncludes = (
  root: BSTNode,
  searchValue: string
): boolean => {
  if (!root) return false;
  if (root.val === searchValue) return true;

  const left = root.left
    ? recursiveDepthFirstTreeIncludes(root.left, searchValue)
    : false;
  const right = root.right
    ? recursiveDepthFirstTreeIncludes(root.right, searchValue)
    : false;
  return left || right;
};

export const breadthFirstPrint = (root: BSTNode) => {
  if (!root) {
    return [];
  }

  const queue = [root];
  const values = [];

  while (queue.length > 0) {
    const current = queue.shift();

    if (!current) return;
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

export const depthFirstIterativePrint = (root: BSTNode) => {
  if (!root) {
    return [];
  }

  const stack = [root];
  const values: (string | number)[] = [];

  while (stack.length > 0) {
    const current = stack.shift();
    if (!current) return;

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

export const depthFirstRecursivePrint = (root: BSTNode) => {
  if (!root) return [];

  let left: (string | number)[] = [];
  let right: (string | number)[] = [];

  if (root.left) {
    left = depthFirstRecursivePrint(root.left);
  }
  if (root.right) {
    right = depthFirstRecursivePrint(root.right);
  }
  return [root.val, ...left, ...right];
};

export const treeSumIterative = (root: BSTNode) => {
  // breadth first
  if (!root) return 0;

  const queue = [root];
  let sum = 0;

  while (queue.length > 0) {
    const current = queue.shift();

    if (current) {
      if (current.left) {
        queue.push(current.left);
      }

      if (current?.right) {
        queue.push(current.right);
      }

      sum += current.val as number;
    }
  }

  return sum;
};

export const treeSumRecursive = (root?: BSTNode): number => {
  /* depth first
    O(n)
    Return 0 for null nodes
    Think about the children of our leaf nodes without children as 0s. We would
    add left (0) + right (0) + current node to get the sum of a node and its children. Take the 4 Node for example. Its children are both null, so 0 and 0. The sum of that node and all its children are 4 + 0 + 0. Then when we bump up a level to the 11 node, it is 4 + 2 + 11
   */
  if (!root) return 0;

  return (
    treeSumRecursive(root.left) +
    treeSumRecursive(root.right) +
    (root.val as number)
  );
};

export const treeMinIterative = (root: BSTNode): number => {
  // The guide used a stack not a queue.

  if (!root) return 0;

  const queue = [root];
  let min = root.val as number;

  while (queue.length > 0) {
    const current = queue.shift();

    if (current) {
      const currentVal = current.val as number;

      if (currentVal < min) min = currentVal;
      if (current.left) queue.push(current.left);
      if (current.right) queue.push(current.right);
    }
  }

  return min;
};

export const treeMinRecursive = (root?: BSTNode): number | null => {
  // My solution with assuming blank nodes are null. I knew it would make more sense
  // To make the nulls Infinity but I didnt know JS had one. Now I do!
  // if (!root) return null;

  // const currentVal = root.val as number;
  // const left = treeMinRecursive(root.left);
  // const right = treeMinRecursive(root.right);
  // let childrenMin = null;

  // if (left && right) {
  //   childrenMin = left < right ? left : right;
  // } else if (left && !right) {
  //   childrenMin = left;
  // } else if (right && !left) {
  //   childrenMin = right;
  // }

  // console.log({
  //   childrenMin,
  //   currentVal,
  // });
  // return childrenMin
  //   ? childrenMin < currentVal
  //     ? childrenMin
  //     : currentVal
  //   : currentVal;

  /**
   * Assume blank nodes are infinity.
   */

  if (!root) return null;

  const currentVal = root.val as number;
  const left = treeMinRecursive(root.left) || Infinity;
  const right = treeMinRecursive(root.right) || Infinity;

  return Math.min(left, right, currentVal);
};

export const MRLPS = (root?: BSTNode): number | null => {
  /**
   * We want to choose between the greatest number between our leaf nodes.
   */
  if (!root) return null;

  const currentVal = root.val as number;
  const left = MRLPS(root.left) || 0;
  const right = MRLPS(root.right) || 0;

  return Math.max(currentVal + left, currentVal + right);
};
