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
  const values: string[] = [];

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

  let left: string[] = [];
  let right: string[] = [];

  if (root.left) {
    left = depthFirstRecursivePrint(root.left);
  }
  if (root.right) {
    right = depthFirstRecursivePrint(root.right);
  }
  return [root.val, ...left, ...right];
};
